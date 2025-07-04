/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import { IBalanceTransfer } from '../types/AccountTypes';

export const transferBalanceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getTransferBalance: build.query<HTTPResponse<IBalanceTransfer[]>, any>({
      query: (params) => {
        return {
          url: `/erp/account/balance-transfer`,
          params,
        };
      },
      providesTags: () => ['transfer', 'money-receipt'],
    }),

    // getAllAccount: build.query<HTTPResponse<IAllAccount[]>, void>({
    //   query: () => {
    //     return {
    //       url: `/account/account`,
    //     };
    //   },
    //   providesTags: () => [{ type: "accounts", id: ACCOUNTS }],
    // }),

    deleteBalanceTransfer: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/account/balance-transfer/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete Balance Transfer', 'success');
        });
      },
      invalidatesTags: () => ['transfer', 'money-receipt'],
    }),

    createBalanceTransfer: build.mutation<unknown, { data: any }>({
      query: ({ data }) => ({
        url: '/erp/account/balance-transfer',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully transfer balance ', 'success');
        });
      },
      invalidatesTags: () => ['transfer', 'accounts'],
    }),
  }),
});

export const {
  useCreateBalanceTransferMutation,
  useGetTransferBalanceQuery,
  useDeleteBalanceTransferMutation,
} = transferBalanceEndPoint;
