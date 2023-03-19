export interface Props {
  count: number
  name?: string
  onClick(): void
}
const Counter: React.FC<Props> = (props) => {
  return <button onClick={() => props.onClick()}>count is {props.count}</button>
}
export default Counter
