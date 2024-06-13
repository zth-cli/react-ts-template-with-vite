import { http } from '@/utils/http'

function useQuery<T>(method: 'GET' | 'POST', url: string, params?: unknown) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await http.request<T>(method, url, params, { signal: controller.signal })
        setData(response)
      } catch (error) {
        setError(error as any)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [url, params])

  return { data, error, loading }
}
function useGetQuery<T>(url: string, params?: unknown) {
  const { data, error, loading } = useQuery<T>('GET', url, params)
  return { data, error, loading }
}
function usePostQuery<T>(url: string, params?: unknown) {
  const { data, error, loading } = useQuery<T>('POST', url, params)
  return { data, error, loading }
}
export { useQuery, useGetQuery, usePostQuery }
