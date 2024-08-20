import { http } from '@/utils/http'
import { AxiosRequestConfig } from 'axios'

// 不定参数请求
// get
export async function apiGet(url: string, params?: unknown): Promise<unknown> {
  const res = await http.get(url, params)
  return res
}
// post
export async function apiPost(url: string, params: unknown, config?: AxiosRequestConfig<unknown>): Promise<unknown> {
  const res = await http.post(url, params, config)
  return res
}
// upload
export async function apiUpload(url: string, params: unknown): Promise<unknown> {
  const res = await http.post(url, params)
  return res
}
