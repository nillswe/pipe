import {MainPage} from '@/pages/main'
import {PrivacyPolicyPage} from '@/pages/privacy-policy'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicyPage />,
  },
])

export const Provider = () => <RouterProvider router={router} />
