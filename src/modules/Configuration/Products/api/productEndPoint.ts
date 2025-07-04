/* eslint-disable @typescript-eslint/ban-types */
import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import { IProduct, IProductsParams } from "../types/ProductTypes";

export const productEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<HTTPResponse<IProduct[]>, IProductsParams>({
      query: (params) => {
        return {
          url: `/erp/product`,
          params,
        };
      },
      providesTags: () => ["product"],
    }),

    createProduct: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/product`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully created ", "success");
        });
      },
      invalidatesTags: () => ["product"],
    }),
    updateProduct: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/product/${id}`,
          method: "PUT",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully update ", "success");
        });
      },
      invalidatesTags: () => ["product"],
    }),
    deleteProduct: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/product/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete", "success");
        });
      },
      invalidatesTags: () => ["product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productEndPoint;
