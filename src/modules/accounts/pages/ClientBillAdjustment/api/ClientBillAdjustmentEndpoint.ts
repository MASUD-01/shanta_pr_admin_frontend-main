/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '../../../../../app/api/userApi/api';
import asyncWrapper from '../../../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../../../app/utils/commonTypes';
import notification from '../../../../../common/Notification/notification';
import { CLIENTBILLADJUSTMENT } from '../../../api/accountConstant';
import {
  IClientBillAdjustment,
  ICreateClientBalance,
} from '../types/ClientBillTypes';

export const ClientBillAdjustmentEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getClientBillAdj: build.query<HTTPResponse<IClientBillAdjustment[]>, any>({
      query: (params) => {
        return {
          url: `/erp/account/client-balance-adjustment`,
          params,
        };
      },
      providesTags: () => [{ type: 'accounts', id: CLIENTBILLADJUSTMENT }],
    }),

    createClientBillAdj: build.mutation<ICreateClientBalance, any>({
      query: (data) => ({
        url: '/erp/account/client-balance-adjustment',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully created ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accounts', id: CLIENTBILLADJUSTMENT }],
    }),
    // UpdateAccount: build.mutation<unknown, { id: number; data: any }>({
    //   query: ({ id, data }) => ({
    //     url: `/erp/account/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("Successfully update account ", "success");
    //     });
    //   },
    //   invalidatesTags: () => [{ type: "accounts", id: "accounts" }],
    // }),

    deleteClientBillAdj: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/account/client-balance-adjustment/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete account', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accounts', id: CLIENTBILLADJUSTMENT }],
    }),
  }),
});

export const {
  useGetClientBillAdjQuery,
  useCreateClientBillAdjMutation,
  useDeleteClientBillAdjMutation,
} = ClientBillAdjustmentEndpoint;
