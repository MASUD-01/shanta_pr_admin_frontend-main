import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import {
  IInvoice,
  IInvoiceFilter,
  ISingleInvoice,
} from '../types/invoiceTypes';

export const invoiceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAllInvoice: build.query<HTTPResponse<IInvoice[]>, IInvoiceFilter>({
      query: (params) => {
        return {
          url: `/erp/invoice`,
          params,
        };
      },
      providesTags: () => ['invoice'],
    }),
    getAllDueInvoice: build.query<HTTPResponse<IInvoice[]>, IInvoiceFilter>({
      query: (params) => {
        return {
          url: `/erp/invoice?due=${true}`,
          params,
        };
      },
      providesTags: () => ['invoice'],
    }),
    getSingleInvoice: build.query<HTTPResponse<ISingleInvoice>, number>({
      query: (id) => {
        return {
          url: `/erp/invoice/${id}`,
        };
      },
      providesTags: () => ['invoice'],
    }),

    createInvoices: build.mutation<
      HTTPResponse<{ invoice_id: number; money_receipt_id: number }>,
      { data: any }
    >({
      query: ({ data }) => {
        return {
          url: `/erp/invoice`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully invoice create ', 'success');
        });
      },
      invalidatesTags: () => [
        'invoice',
        'clientLedger',
        { type: 'permission', id: 'permission' },
        { type: 'User', id: 'profile' },
      ],
    }),
    updateInvoices: build.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/invoice/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update invoice  ', 'success');
        });
      },
      invalidatesTags: () => ['invoice'],
    }),
    deleteInvoice: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/invoice/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully delete invoice', 'success');
        });
      },
      invalidatesTags: () => ['invoice'],
    }),
  }),
});

export const {
  useCreateInvoicesMutation,
  useGetAllInvoiceQuery,
  useGetAllDueInvoiceQuery,
  useGetSingleInvoiceQuery,
  useDeleteInvoiceMutation,
  useUpdateInvoicesMutation,
} = invoiceEndPoint;
