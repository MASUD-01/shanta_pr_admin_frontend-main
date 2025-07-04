import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import {
  IAllDesignation,
  ICreateDesignation,
  IDesignationParams,
} from "../types/DesignationTypes";

export const sourceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getDesignation: build.query<
      HTTPResponse<IAllDesignation[]>,
      IDesignationParams
    >({
      query: (params) => {
        return {
          url: `/erp/designation`,
          params,
        };
      },
      providesTags: () => ["designation"],
    }),

    createDesignation: build.mutation<unknown, { data: ICreateDesignation }>({
      query: ({ data }) => {
        return {
          url: `/erp/designation`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully Designation created", "success");
        });
      },
      invalidatesTags: () => ["designation"],
    }),
    updateDesignation: build.mutation<
      unknown,
      { id: number; data: ICreateDesignation }
    >({
      query: ({ id, data }) => {
        return {
          url: `/erp/designation/${id}`,
          method: "PUT",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully Designation update", "success");
        });
      },
      invalidatesTags: () => ["designation"],
    }),
    deleteDesignation: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/designation/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete Designation", "success");
        });
      },
      invalidatesTags: () => ["designation"],
    }),
  }),
});

export const {
  useCreateDesignationMutation,
  useDeleteDesignationMutation,
  useGetDesignationQuery,
  useUpdateDesignationMutation,
} = sourceEndPoint;
