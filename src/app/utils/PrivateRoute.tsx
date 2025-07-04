import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user, requiredPermissions, children }: any) => {
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (requiredPermissions) {
  //   const hasPermission = requiredPermissions.every((permission: any) =>
  //     user.permissions?.modules.some((module: any) =>
  //       module.sub_modules.some(
  //         (subModule: any) => subModule.permissions[permission]
  //       )
  //     )
  //   );

  //   if (!hasPermission) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }
  // }

  return /* children  */ true ? children : <Outlet />;
};

export default PrivateRoute;
