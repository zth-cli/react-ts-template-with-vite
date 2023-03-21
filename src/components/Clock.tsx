import { useState, useRef } from 'react'

export default function Stopwatch({ buttonText }: { buttonText: string }) {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined)
  const numRef = useRef(0)
  let num = 1

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  function handleStop() {
    numRef.current += 1
    num += 1
    console.log('numRef.current', numRef.current) // 每次累加1,可存储上次的值
    console.log('num', num) // 1
    clearInterval(intervalRef.current)
  }

  let secondsPassed = 0
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000
  }

  // 只有buttonText改变时才重新渲染renderButton
  const renderButton = useCallback(() => <button>{buttonText}</button>, [buttonText])

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {renderButton()}
    </>
  )
}
