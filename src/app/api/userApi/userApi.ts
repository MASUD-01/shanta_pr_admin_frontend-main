/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseQueryWithReAuth } from '../../slice/baseQuery';
import { setUser } from '../../features/userSlice';
import { ILoginResponse, IUser } from '../../../auth/types/authTypes';
import { createApi } from '@reduxjs/toolkit/query/react';
import asyncWrapper from '../../utils/asyncWrapper';
import notification from '../../../common/Notification/notification';

export const userApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'userApi',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<ILoginResponse<IUser>, void>({
      query() {
        return {
          url: '/admin/profile',
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 400 && response.data) {
          const { message: err } = response.data as {
            message: string;
            success: boolean;
          };
          console.log(err);
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: () => [{ type: 'User', id: 'profile' }],
    }),

    updatePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: `/erp/user/change-password`,
        method: 'PATCH',
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
        });
      },
    }),

    updateProfile: builder.mutation<
      unknown,
      {
        data: {
          first_name: string;
          last_name: string;
          phone_number: number;
          photo: File;
        };
      }
    >({
      query: (data) => ({
        url: `/erp/user/profile`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update Profile ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'User', id: 'profile' }],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
