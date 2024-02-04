import React, { FC, useContext } from 'react';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import { Paths } from './router';

interface IProtectedRouteProps {
  children: React.ReactNode;
  onlyUnauth?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  const {
    children,
    onlyUnauth,
  } = props;

  const { store } = useContext(Context);
  const isAuth = store.isAuth;

  if (isAuth && onlyUnauth) {
    return <Navigate to={Paths.ACCOUNT} replace />
  }

  if (!isAuth && onlyUnauth) {
    return children;
  }

  if (!isAuth) {
    return <Navigate to={Paths.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;