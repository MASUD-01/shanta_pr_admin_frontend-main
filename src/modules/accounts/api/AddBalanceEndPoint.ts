/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import { IAddBalance } from '../types/AccountTypes';
import { Transaction_History } from './accountConstant';

export const AddBalanceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAddBalance: build.query<HTTPResponse<IAddBalance[]>, any>({
      query: (params) => {
        return {
          url: `/erp/account/adjust-balance`,
          params,
        };
      },
      providesTags: () => ['balance'],
    }),

    // getAllAccount: build.query<HTTPResponse<IAllAccount[]>, void>({
    //   query: () => {
    //     return {
    //       url: `/account/account`,
    //     };
    //   },
    //   providesTags: () => [{ type: "accounts", id: ACCOUNTS }],
    // }),

    getSingleBalanceAjustment: build.query<HTTPResponse<any>, number>({
      query: (id) => {
        return {
          url: `/erp/account/adjust-balance/${id}`,
        };
      },
      providesTags: () => ['balance'],
    }),

    deleteBalanceAdjustment: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/account/adjust-balance/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete Balance Adjustment', 'success');
        });
      },
      invalidatesTags: () => ['balance', 'accounts'],
    }),

    createAddBalance: build.mutation<unknown, { data: any }>({
      query: ({ data }) => ({
        url: '/erp/account/adjust-balance',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully balance added ', 'success');
        });
      },
      invalidatesTags: () => [
        'balance',
        'accounts',
        { type: 'accounts', id: Transaction_History },
      ],
    }),
  }),
});

export const {
  useCreateAddBalanceMutation,
  useGetAddBalanceQuery,
  useDeleteBalanceAdjustmentMutation,
  useGetSingleBalanceAjustmentQuery,
} = AddBalanceEndPoint;
