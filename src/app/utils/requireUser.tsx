/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from 'react-router-dom';
import { token as getToken } from '../../helpers/constant';
import { userApi } from '../api/userApi/userApi';
import GlobalLoader from './GlobalLoader';

const RequireUser = ({
  children,
}: {
  allowedRoles?: string[];
  children: JSX.Element;
}): any => {
  
  const location = useLocation();

  const { isLoading } = userApi.endpoints.getMe.useQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const storedUser = localStorage?.getItem(getToken);
  const token = storedUser ? storedUser : null;

  // const loading = isLoading || isFetching;

  // const profileData = userApi.endpoints.getMe.useQueryState(undefined, {
  //   selectFromResult: (cache) => {
  //     const data = cache.data?.data;
  //     let profileData: IUser = {} as IUser;
  //     if (data) {
  //       profileData = data;
  //     }
  //     return profileData;
  //   },
  // });

  // if (isLoading) {
  //   return <GlobalLoader />;
  // }
  return true ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
  // return token &&
  //   profileData.id &&
  //   allowedRoles.includes(profileData.roleName as string) ? (
  //   children
  // ) : token && profileData.id ? (
  //   <Navigate to='/unauthorized' state={{ from: location }} replace />
  // ) : (
  //   <Navigate to='/login' state={{ from: location }} replace />
  // );
};

export default RequireUser;
