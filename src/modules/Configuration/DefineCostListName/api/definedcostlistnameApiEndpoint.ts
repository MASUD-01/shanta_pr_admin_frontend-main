/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../../app/api/userApi/api';
import asyncWrapper from '../../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../../app/utils/commonTypes';
import notification from '../../../../common/Notification/notification';

export const definedcostlistnameApiEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getDefineCostListName: build.query<HTTPResponse<any[]>, any>({
      query: (params) => {
        return {
          url: `/erp/client-category`,
          params,
        };
      },
      providesTags: () => ['client-category'],
    }),

    defineCostListName: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/client-category`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully created ', 'success');
        });
      },
      invalidatesTags: () => ['client-category'],
    }),
    updateDefineCostListName: build.mutation<
      unknown,
      { id: number; data: any }
    >({
      query: ({ id, data }) => {
        return {
          url: `/erp/client-category/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update ', 'success');
        });
      },
      invalidatesTags: () => ['client-category'],
    }),
    deleteDefineCostListName: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/client-category/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete', 'success');
        });
      },
      invalidatesTags: () => ['client-category'],
    }),
  }),
});

export const {
  useDefineCostListNameMutation,
  useGetDefineCostListNameQuery,
  useDeleteDefineCostListNameMutation,
  useUpdateDefineCostListNameMutation,
} = definedcostlistnameApiEndpoint;
