import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/notification";
import { IInvoiceFilter } from "../../invoice/types/invoiceTypes";
import { IQuotation, ISingleQuotation } from "../types/quotationTypes";

export const quotationEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAllQuotation: build.query<HTTPResponse<IQuotation[]>, IInvoiceFilter>({
      query: (params) => {
        return {
          url: `/erp/quotation`,
          params,
        };
      },
      providesTags: () => ["quotation"],
    }),
    getSingleQuotation: build.query<HTTPResponse<ISingleQuotation>, number>({
      query: (id) => {
        return {
          url: `/erp/quotation/${id}`,
        };
      },
      providesTags: () => ["quotation"],
    }),
    createQuotation: build.mutation<any, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/quotation`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully quotation create ", "success");
        });
      },
      invalidatesTags: () => ["quotation"],
    }),
    updateQuotation: build.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/quotation/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully update quotation  ", "success");
        });
      },
      invalidatesTags: () => ["quotation"],
    }),
    deleteQuotation: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/quotation/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete quotation", "success");
        });
      },
      invalidatesTags: () => ["quotation"],
    }),
  }),
});

export const {
  useCreateQuotationMutation,
  useGetAllQuotationQuery,
  useGetSingleQuotationQuery,
  useDeleteQuotationMutation,
  useUpdateQuotationMutation,
} = quotationEndPoint;
