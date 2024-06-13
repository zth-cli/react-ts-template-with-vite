import { useGetQuery } from '@/hooks/useQuery'
import { Button, List } from 'antd'

export interface Iitem {
  name: string
  hot: string
  url: string
}
export interface IndexResponse {
  data: Array<Iitem>
  msg: string
  code: number
}
export default function Index() {
  const [url, setUrl] = useState('/v2/baiduhot')
  const { data, error, loading } = useGetQuery<IndexResponse>(url)
  const changeUrl = () => {
    setUrl('/v2/douyinhot')
  }
  return (
    <>
      <h1>
        Index
        {loading && 'loading'}
        {error && 'error'}
      </h1>
      <Button onClick={changeUrl}>change</Button>
      {/* {data && <pre>{JSON.stringify(data['data'], null, 2)}</pre>} */}
      {/* {data && data['data'].map((item) => <div key={item.name}>{item.name}</div>)} */}
      <List<Iitem>
        itemLayout='horizontal'
        dataSource={data?.data}
        loading={loading}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={
                <a target='_blank' href={item.url} rel='noreferrer'>
                  {item.name}
                </a>
              }
              description='Ant Design, a design language for background applications, is refined by Ant UED Team'
            />
          </List.Item>
        )}
      />
    </>
  )
}
