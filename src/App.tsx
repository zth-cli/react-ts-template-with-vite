// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Counter from './components/counter'
import Clock from '@/components/Clock'
import { ConfigProvider, DatePicker } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const updataCount = () => {
    setCount(count + 1)
  }
  return (
    <div className='App'>
      <ConfigProvider locale={zhCN}>
        <div>
          <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
            <img src='/vite.svg' className='logo' alt='Vite logo' />
          </a>
          <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className='card'>
          <Counter count={count} onClick={updataCount}></Counter>
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <DatePicker />
          <Clock buttonText='按钮' />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      </ConfigProvider>
    </div>
  )
}

export default App
