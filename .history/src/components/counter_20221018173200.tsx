export interface Props {
  count: number
  name?: string
}
const Counter: React.FC<Props> = ({ count = '' as string }) => {
  return <button>count is {count}</button>
}
export default Counter
