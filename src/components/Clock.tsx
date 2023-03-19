import { Component } from 'react'

class Clock extends Component {
  timerID!: NodeJS.Timeout
  constructor(props: { [x: string]: string }) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is 1</h2>
      </div>
    )
  }
}
export default Clock
