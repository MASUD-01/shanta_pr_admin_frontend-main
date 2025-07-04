import React from 'react';
import useAuthCheck from './useAuthCheck';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const authChecked = useAuthCheck();

  if (!authChecked) {
    return null;
  }

  return children;
};

export default AuthMiddleware;
