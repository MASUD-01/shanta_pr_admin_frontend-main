import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import { IInvoiceFilter } from '../../invoice/types/invoiceTypes';
import { IMoneyReceipt, ISingleMoneyReceipt } from '../types/moneyReceiptTypes';

export const moneyReceiptEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getMoneyReceipt: build.query<HTTPResponse<IMoneyReceipt[]>, IInvoiceFilter>(
      {
        query: (params) => {
          return {
            url: `/erp/money-receipt`,
            params,
          };
        },
        providesTags: () => ['money-receipt'],
      }
    ),
    getSingleMoneyReceipt: build.query<
      HTTPResponse<ISingleMoneyReceipt>,
      number
    >({
      query: (id) => {
        return {
          url: `/erp/money-receipt/${id}`,
        };
      },
      // providesTags: () => [{ type: "expense", id: "list" }],
    }),
    // getExpenseAllSubHead: build.query<HTTPResponse<IExpenseSubHead[]>, number>({
    //   query: (id) => {
    //     return {
    //       url: `/erp/expense-head/${id}`,
    //     };
    //   },
    //   // providesTags: () => [{ type: "expense", id: "list" }],
    // }),

    createMoneyReceipt: build.mutation<any, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/money-receipt`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully money receipt create ', 'success');
        });
      },
      invalidatesTags: () => ['money-receipt', 'clientLedger'],
    }),

    deleteMoneyReceipt: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/money-receipt/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete money receipt', 'success');
        });
      },
      invalidatesTags: () => ['money-receipt'],
    }),
  }),
});

export const {
  useCreateMoneyReceiptMutation,
  useGetMoneyReceiptQuery,
  useGetSingleMoneyReceiptQuery,
  useDeleteMoneyReceiptMutation,
} = moneyReceiptEndPoint;
