import { Route, RouteObject, Routes } from 'react-router-dom'
import { router } from './router'
import AuthRoute from './router/AuthRoute'

const App = () => {
  // 处理我们的routers
  const RouteAuthFun = (routeList: RouteObject[]) => {
    return routeList.map((item) => {
      return (
        <Route path={item.path} key={item.path} element={<AuthRoute key={item.path}>{item.element}</AuthRoute>}>
          {/* 递归调用，因为可能存在多级的路由 */}
          {item?.children && RouteAuthFun(item.children)}
        </Route>
      )
    })
  }
  return <Routes>{RouteAuthFun(router)}</Routes>
}
export default App
