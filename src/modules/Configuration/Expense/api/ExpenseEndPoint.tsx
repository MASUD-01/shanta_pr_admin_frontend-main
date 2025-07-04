/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../../app/api/userApi/api';
import asyncWrapper from '../../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../../app/utils/commonTypes';
import notification from '../../../../common/Notification/notification';
import {
  ICreateExpenseHead,
  IExpenseHead,
  IExpenseParams,
  IExpenseSubHead,
} from '../types/ExpenseTypes';

export const expenseEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getExpenseHead: build.query<HTTPResponse<IExpenseHead[]>, IExpenseParams>({
      query: (params) => {
        return {
          url: `/erp/expense-head`,
          params,
        };
      },
      providesTags: () => [{ type: 'expense-head', id: 'list' }],
    }),
    getExpenseSubHead: build.query<
      HTTPResponse<IExpenseSubHead[]>,
      IExpenseParams
    >({
      query: (params) => {
        return {
          url: `/erp/expense-sub-head`,
          params,
        };
      },
      providesTags: () => [{ type: 'expense-sub-head', id: 'list' }],
    }),
    CreateExpenseHead: build.mutation<unknown, { data: ICreateExpenseHead }>({
      query: ({ data }) => {
        return {
          url: `/erp/expense-head`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully  created ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'expense-head', id: 'list' }],
    }),
    updateExpenseHead: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/expense-head/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully  Update ', 'success');
        });
      },
      invalidatesTags: () => [{ type: 'expense-head', id: 'list' }],
    }),
    CreateExpenseSubHead: build.mutation<unknown, { data: ICreateExpenseHead }>(
      {
        query: ({ data }) => {
          return {
            url: `/erp/expense-sub-head`,
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
        invalidatesTags: () => [{ type: 'expense-sub-head', id: 'list' }],
      }
    ),
    UpdateExpenseSubHead: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/expense-sub-head/${id}`,
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
      invalidatesTags: () => [{ type: 'expense-sub-head', id: 'list' }],
    }),
    deleteExpenseHead: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/expense-head/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete', 'success');
        });
      },
      invalidatesTags: () => ['expense-head'],
    }),
    deleteExpenseSubHead: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/expense-sub-head/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete', 'success');
        });
      },
      invalidatesTags: () => ['expense-sub-head'],
    }),
  }),
});

export const {
  useGetExpenseHeadQuery,
  useCreateExpenseHeadMutation,
  useGetExpenseSubHeadQuery,
  useCreateExpenseSubHeadMutation,
  useDeleteExpenseHeadMutation,
  useUpdateExpenseHeadMutation,
  useDeleteExpenseSubHeadMutation,
  useUpdateExpenseSubHeadMutation,
} = expenseEndPoint;
