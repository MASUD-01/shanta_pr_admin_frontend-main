/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import notification from '../../../common/Notification/notification';
import {
  IGetAllRolePermissionList,
  IViewAllModule,
} from '../types/rolePermission';
import { HTTPResponse } from './../../../app/utils/commonTypes';

export const RolePermissionEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getRolePermission: build.query<
      HTTPResponse<IGetAllRolePermissionList[]>,
      void
    >({
      query: () => {
        return {
          url: `/erp/admin/role-permission`,
        };
      },
      providesTags: () => [{ type: 'permission', id: 'permission' }],
    }),

    createRolePermission: build.mutation<any[], { data: any }>({
      query: (data) => {
        return {
          url: '/erp/admin/role-permission',
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully Created Role & Permission ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'permission', id: 'permission' }],
    }),

    getSingleRole: build.query({
      query: (id) => {
        return {
          url: `/erp/admin/role-permission/${id}`,
        };
      },
      providesTags: [{ type: 'permission', id: 'permission' }],
    }),

    updateRoleAndPermission: build.mutation({
      query: ({ id, data }) => ({
        url: `/erp/admin/role-permission/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully Updates Role & Permission ', 'success');
        });
      },
      invalidatesTags: [
        { type: 'permission', id: 'permission' },
        { type: 'User', id: 'profile' },
      ],
    }),

    getAllModule: build.query<HTTPResponse<IViewAllModule[]>, void>({
      query: () => {
        return {
          url: `/erp/admin/module`,
        };
      },
      providesTags: () => [{ type: 'permission', id: 'permission' }],
    }),
  }),
});

export const {
  useGetRolePermissionQuery,
  useGetAllModuleQuery,
  useCreateRolePermissionMutation,
  useGetSingleRoleQuery,
  useUpdateRoleAndPermissionMutation,
} = RolePermissionEndPoint;
