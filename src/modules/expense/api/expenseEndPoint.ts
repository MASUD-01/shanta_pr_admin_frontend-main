/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
// import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import { FilterItem } from '../pages/ExpenseList';
// import notification from "../../../common/Notification/notification";
import {
  IExpense,
  IExpenseSubHead,
  ISingleExpense,
} from '../types/expenseType';

export type TFilter = FilterItem | undefined;

export const expenseEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getExpense: build.query<HTTPResponse<IExpense[]>, TFilter>({
      query: (params) => {
        return {
          url: `/erp/expense`,
          params,
        };
      },
      providesTags: () => ['expense'],
    }),
    getSingleExpense: build.query<HTTPResponse<ISingleExpense>, number>({
      query: (id) => {
        return {
          url: `/erp/expense/${id}`,
        };
      },
      providesTags: () => [{ type: 'expense', id: 'list' }],
    }),
    getExpenseAllSubHead: build.query<HTTPResponse<IExpenseSubHead[]>, void>({
      query: () => {
        return {
          url: `/erp/expense-sub-head`,
        };
      },
      // providesTags: () => [{ type: "expense", id: "list" }],
    }),

    createExpense: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/expense`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully expense create ', 'success');
        });
      },
      invalidatesTags: () => ['expense', 'accounts', 'dashboardProfitLoss'],
    }),

    updateSingleExpense: build.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/expense/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update Expense  ', 'success');
        });
      },
      invalidatesTags: () => ['expense'],
    }),

    deleteExpense: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/expense/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete ', 'success');
        });
      },
      invalidatesTags: () => ['expense'],
    }),
  }),
});

export const {
  useGetExpenseQuery,
  useGetExpenseAllSubHeadQuery,
  useCreateExpenseMutation,
  useGetSingleExpenseQuery,
  useDeleteExpenseMutation,
  useUpdateSingleExpenseMutation,
} = expenseEndPoint;
