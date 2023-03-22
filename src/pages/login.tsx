import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const loginSys = () => {
    sessionStorage.setItem('access_token', '123')
    navigate('/')
  }
  return (
    <div>
      <h1>登录</h1>
      <Button onClick={loginSys}>立即登录</Button>
    </div>
  )
}
export default Login
