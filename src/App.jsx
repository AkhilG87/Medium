import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { React, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContext } from './context/authContext'
import Login from './Pages/login/Login'
import Home from './Pages/home/Home'
import Write from './Pages/write/Write'
import Show from './Pages/show/Show'
import SignUp from './Pages/signUp/SignUp'
import Pay from './Pages/pay/Pay'

const queryClient = new QueryClient()

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }
  const Layout = () => {
    return (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/blogs" />,
    },
    {
      path: '/login',
      element: <Login />,
    },

    {
      path: '/register',
      element: <SignUp />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'blogs',
          element: <Home />,
        },
        {
          path: 'blogs/new',
          element: <Write />,
        },
        {
          path: 'blogs/:id',
          element: <Show />,
        },
        {
          path: 'blogs/:id/edit',
          element: <Write />,
        },
        {
          path: 'pay',
          element: <Pay />,
        },
      ],
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
