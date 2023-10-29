import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector } from 'react-redux'
import Home from "./pages/Home"

function App() {
  const user = useSelector((state: any) => state.user)

  const routes = createBrowserRouter([
    {
      path: "/",
      element: user.auth ? <Home /> : <Login />
    },
    {
      path: "/sign-up",
      element: <Register />
    }
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default App;
