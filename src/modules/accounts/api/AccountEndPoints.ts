/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import {
  IAccountGroup,
  IAccountHeadParams,
  IAccoutHeadAll,
  IAllAccount,
  // ICAccount,
  ICreateAccount,
  IFilterItem,
  ITransactionHistory,
} from '../types/AccountTypes';
import { ACCOUNTHEAD, ACCOUNTS, Transaction_History } from './accountConstant';

export const AccountEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAccountGroup: build.query<HTTPResponse<IAccountGroup[]>, void>({
      query: () => {
        return {
          url: `/account/group`,
        };
      },
      providesTags: () => [{ type: 'accounts', id: ACCOUNTS }],
    }),

    getAccountHead: build.query<
      HTTPResponse<IAccoutHeadAll[]>,
      IAccountHeadParams
    >({
      query: (params) => {
        return {
          url: `/erp/account/head`,
          params,
        };
      },
      providesTags: () => [{ type: 'accountHead', id: ACCOUNTHEAD }],
    }),
    getAccountHeadCommon: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/erp/expense-head`,
        };
      },
      // providesTags: () => [{ type: "accountHead", id: ACCOUNTHEAD }],
    }),
    createAccountHead: build.mutation<unknown, Partial<ICreateAccount>>({
      query: (data) => ({
        url: '/erp/account/head',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully created ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accountHead', id: ACCOUNTHEAD }],
    }),
    getAllAccount: build.query<HTTPResponse<IAllAccount[]>, any>({
      query: (params) => {
        return {
          url: `/erp/account`,
          params,
        };
      },
      providesTags: () => [
        { type: 'accounts', id: 'accounts' },
        'money-receipt',
      ],
    }),
    createAccount: build.mutation<unknown, unknown>({
      query: (data) => ({
        url: '/erp/account',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully create account ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accounts', id: 'accounts' }],
    }),
    UpdateAccount: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/erp/account/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update account ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accounts', id: 'accounts' }],
    }),

    deleteAccount: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/account/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete account', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'accounts', id: 'accounts' }],
    }),
    getAccountStatement: build.query<
      HTTPResponse<ITransactionHistory[]>,
      { params: any }
    >({
      query: ({ params }) => ({
        url: `/erp/account/transaction-history`,
        method: 'GET',
        params,
      }),

      // invalidatesTags: () => [{ type: "accounts", id: ACCOUNTS }],
    }),
    transactionsHistory: build.query<
      HTTPResponse<ITransactionHistory[]>,
      IFilterItem
    >({
      query: (params) => ({
        url: `/erp/account/transaction-history`,
        method: 'GET',
        params,
      }),

      providesTags: () => [{ type: 'accounts', id: Transaction_History }],
    }),
  }),
});

export const {
  useGetAccountGroupQuery,
  useGetAccountHeadQuery,
  useGetAccountHeadCommonQuery,
  useCreateAccountHeadMutation,
  useGetAllAccountQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useLazyGetAccountStatementQuery,
  useTransactionsHistoryQuery,
} = AccountEndPoint;
