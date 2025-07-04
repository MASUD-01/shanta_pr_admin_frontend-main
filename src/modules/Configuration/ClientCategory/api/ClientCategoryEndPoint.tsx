/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import {
  IClientCategory,
  IClientCategoryParams,
} from "../types/ClientCategoryTypes";

export const ClientCategoryEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getClientCategory: build.query<
      HTTPResponse<IClientCategory[]>,
      IClientCategoryParams
    >({
      query: (params) => {
        return {
          url: `/erp/client-category`,
          params,
        };
      },
      providesTags: () => ["client-category"],
    }),

    createClientCategory: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/client-category`,
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
      invalidatesTags: () => ["client-category"],
    }),
    updateClientCategory: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/client-category/${id}`,
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
      invalidatesTags: () => ["client-category"],
    }),
    deleteClientCategory: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/client-category/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete", "success");
        });
      },
      invalidatesTags: () => ["client-category"],
    }),
  }),
});

export const {
  useCreateClientCategoryMutation,
  useGetClientCategoryQuery,
  useDeleteClientCategoryMutation,
  useUpdateClientCategoryMutation,
} = ClientCategoryEndPoint;
