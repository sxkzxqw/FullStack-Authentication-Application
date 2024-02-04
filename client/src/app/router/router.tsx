import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AccountPage from "../../pages/AccountPage/AccountPage";

export enum Paths {
  USERS = '/users',
  LOGIN = '/login',
  REGISTER = '/register',
  ACCOUNT = '/account',
}

const routes = [
  {
    path: Paths.LOGIN,
    element: <MainLayout />,
    children: [
      {
        path: Paths.LOGIN,
        element: <ProtectedRoute onlyUnauth><LoginPage /></ProtectedRoute>,
      }
    ]
  },
  {
    path: Paths.REGISTER,
    element: <MainLayout />,
    children: [
      {
        path: Paths.REGISTER,
        element: <ProtectedRoute onlyUnauth><RegisterPage /></ProtectedRoute>,
      }
    ]
  },
  {
    path: Paths.USERS,
    element: <MainLayout />,
    children: [
      {
        path: Paths.USERS,
        element: <ProtectedRoute><UsersPage /></ProtectedRoute>,
      }
    ]
  },
  {
    path: Paths.ACCOUNT,
    element: <MainLayout />,
    children: [
      {
        path: Paths.ACCOUNT,
        element: <ProtectedRoute><AccountPage /></ProtectedRoute>,
      }
    ]
  },
]

const router = createBrowserRouter(routes);

export default router;