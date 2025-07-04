import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import { IAllSource, ICreateSource, ISourceParams } from "../types/SourceTypes";

export const sourceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getSource: build.query<HTTPResponse<IAllSource[]>, ISourceParams>({
      query: (params) => {
        return {
          url: `/erp/source`,
          params,
        };
      },
      providesTags: () => ["source"],
    }),

    createSource: build.mutation<unknown, { data: ICreateSource }>({
      query: ({ data }) => {
        return {
          url: `/erp/source`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully source created", "success");
        });
      },
      invalidatesTags: () => ["source"],
    }),
    updateSource: build.mutation<unknown, { id: number; data: ICreateSource }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/source/${id}`,
          method: "PUT",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully source update", "success");
        });
      },
      invalidatesTags: () => ["source"],
    }),
    deleteSource: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/source/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete source", "success");
        });
      },
      invalidatesTags: () => ["source"],
    }),
  }),
});

export const {
  useGetSourceQuery,
  useCreateSourceMutation,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} = sourceEndPoint;
