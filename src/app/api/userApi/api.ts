import { message } from 'antd';
import { baseQueryWithReAuth } from '../../slice/baseQuery';
import { setToken } from '../../features/userSlice';
import asyncWrapper from '../../utils/asyncWrapper';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginResponse, IUser } from '../../../auth/types/authTypes';
import { ACCOUNTS } from '../../../modules/accounts/api/accountConstant';
import { userApi } from './userApi';

export const api = createApi({
  reducerPath: 'ERP_Api',
  baseQuery: baseQueryWithReAuth,
  // keepUnusedDataFor: expire.default,
  endpoints: (builder) => ({
    login: builder.mutation<
      ILoginResponse<IUser>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/admin/login',
        method: 'POST',
        body: body,
        // credentials: "include",
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        asyncWrapper(async () => {
          const { data } = await queryFulfilled;
          // console.log(data.token);
          dispatch(setToken(data.token!));
          await dispatch(userApi.endpoints.getMe.initiate());
          message.success('Successfully logged in!');
        });
      },
    }),
  }),
  tagTypes: [
    ...ACCOUNTS,
    'profile',
    'person',
    'meeting',
    'place',
    'admin',
    'payroll',
    'expense',
    'balance',
    'product',
    'accounts',
    'quotation',
    'invoice',
    'client',
    'advanceReturn',
    'User',
    'Permission',
  ],
});

export const { useLoginMutation } = api;
