import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic,
  Canceler,
  AxiosError,
  Method,
  InternalAxiosRequestConfig,
} from 'axios'
import { genConfig, FILES_TYPES } from './config'
import { transformConfigByMethod } from './utils'
import { httpStatus } from './httpStatus'
import { message } from 'antd'

type cancelTokenItem = {
  cancelKey: string
  cancelHandler: Canceler
}
export type AxiosRequestConfigs = AxiosRequestConfig & { parallel?: boolean }
export type Interceptors = {
  request?: (arg0: AxiosRequestConfigs) => void
  response?: (arg0: AxiosResponse) => void
}
interface FetchHttppError extends AxiosError {
  isCancelRequest?: boolean
}
class FetchHttp {
  interceptors: Interceptors | undefined
  constructor(interceptors?: Interceptors) {
    this.interceptors = interceptors
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  // axios 实例
  private static axiosInstance: AxiosInstance = axios.create(genConfig())
  //每个请求的标识 和 取消函数
  public sourceTokenList: Array<cancelTokenItem> = []
  // axios取消对象
  private CancelToken = axios.CancelToken as CancelTokenStatic
  // 本次请求的标识 和 取消函数
  private currentCabcelToken = ''

  // 每次请求设置唯一标识
  private static setCancelTokenString(config: AxiosRequestConfigs): string {
    return `${config.url}&&${JSON.stringify(config.params)}&&${config.data}`
  }
  // 清除唯一标识
  deleteCancelTokenString(cancelKey: string): void {
    this.sourceTokenList =
      this.sourceTokenList.length < 1
        ? this.sourceTokenList.filter((cancelToken) => cancelToken.cancelKey !== cancelKey)
        : []
  }
  // 移除重复多余的请求
  cancelRepeatRequest(): void {
    const temp: Array<string> = []
    this.sourceTokenList = this.sourceTokenList.reduce<Array<cancelTokenItem>>(
      (res: Array<cancelTokenItem>, cancelToken: cancelTokenItem) => {
        const { cancelKey, cancelHandler } = cancelToken
        if (temp.indexOf(cancelKey) === -1) {
          temp.push(cancelKey)
          res.push(cancelToken)
        } else {
          cancelHandler()
        }
        return res
      },
      [],
    )
  }

  // 请求拦截器
  private interceptorsRequest(): void {
    FetchHttp.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<unknown> & { parallel?: boolean }) => {
        const _config = config
        if (!_config.parallel) {
          // 1.设置一个请求标识
          const cancelKey = FetchHttp.setCancelTokenString(_config)
          this.currentCabcelToken = cancelKey

          // 2.通过axios.CancelToken构造函数生成取消函数
          _config.cancelToken = new this.CancelToken((cancelHandler: Canceler) => {
            this.sourceTokenList.push({ cancelKey, cancelHandler })
          })
          this.cancelRepeatRequest()
          if (this.interceptors?.request) {
            this.interceptors?.request(_config)
          }
        }
        return _config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
  }

  // 响应拦截器
  private interceptorsResponse(): void {
    FetchHttp.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const _config = response.config
        // 请求每次成功一次就删除当前canceltoken标记
        const cancelKey = FetchHttp.setCancelTokenString(_config)
        this.deleteCancelTokenString(cancelKey)
        this.currentCabcelToken = ''
        if (this.interceptors?.response) {
          this.interceptors?.response(response)
        }
        return response.data
      },
      (error: FetchHttppError) => {
        const $error = error
        // 判断当前的请求中是否在 取消token数组理存在，如果存在则移除（单次请求流程）
        if (this.currentCabcelToken) {
          const haskey = this.sourceTokenList.filter(
            (cancelToken) => cancelToken.cancelKey === this.currentCabcelToken,
          ).length
          if (haskey) {
            this.sourceTokenList = this.sourceTokenList.filter(
              (cancelToken) => cancelToken.cancelKey !== this.currentCabcelToken,
            )
            this.currentCabcelToken = ''
          }
        }
        $error.isCancelRequest = axios.isCancel($error)
        // 所有的响应异常 区分来源为取消请求/非取消请求
        // httpStatus
        if (!$error.isCancelRequest) {
          httpStatus(error.response && error.response.status, '', message)
        } else {
          console.warn(error, '请求被取消！')
        }
        return Promise.reject($error)
      },
    )
  }

  // 封装请求
  public request<T>(method: Method, url: string, param?: unknown, axiosConfig?: AxiosRequestConfigs): Promise<T> {
    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig,
    } as AxiosRequestConfigs)
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      FetchHttp.axiosInstance
        .request<unknown, T>(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  public post<T>(url: string, params?: unknown, config?: AxiosRequestConfigs): Promise<T> {
    return this.request<T>('post', url, params, config)
  }

  public get<T>(url: string, params?: unknown, config?: AxiosRequestConfigs): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
  public async dowmload(url: string, params: unknown, fileName: string, fileType: keyof typeof FILES_TYPES = 'xls') {
    const res = await this.request<BlobPart>('get', url, params, { responseType: 'blob' })
    const blob: Blob = new Blob([res], { type: FILES_TYPES[fileType] || 'application/vnd.ms-excel' })
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName + '.' + fileType
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    link.remove()
  }
}
export { FetchHttp }
