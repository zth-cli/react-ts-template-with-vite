export interface Props {
  count: number
  name?: string
  onClick(): void
}
const Counter: React.FC<Props> = ({ count, onClick }) => {
  return <button onClick={onClick}>count is {count}</button>
}
export default Counter
