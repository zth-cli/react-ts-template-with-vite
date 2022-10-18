export interface Props {
  count: number
  name?: string
}
const Counter: React.FC<Props> = (props) => {
  return <button>count is {props.count}</button>
}
export default Counter
