import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import {
  ICreateService,
  ICreateServiceParams,
} from "../types/ClientCategoryTypes";

export const CreateServiceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getCreateService: build.query<
      HTTPResponse<ICreateService[]>,
      ICreateServiceParams
    >({
      query: (params) => {
        return {
          url: `/erp/client-category`,
          params,
        };
      },
      providesTags: () => ["client-category"],
    }),

    createService: build.mutation<unknown, { data: any }>({
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
    updateCreateService: build.mutation<unknown, { id: number; data: any }>({
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
    deleteCreateService: build.mutation<unknown, number>({
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
  useCreateServiceMutation,
  useGetCreateServiceQuery,
  useDeleteCreateServiceMutation,
  useUpdateCreateServiceMutation,
} = CreateServiceEndPoint;
