/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import { IDepartment, IDepartmentParams } from "../types/departmentTypes";

export const departmentEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getDepartment: build.query<HTTPResponse<IDepartment[]>, IDepartmentParams>({
      query: (params) => {
        return {
          url: `/erp/department`,
          params,
        };
      },
      providesTags: () => [{ type: "department", id: "list" }],
    }),

    createDepartment: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/department`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully department create ", "success");
        });
      },
      invalidatesTags: () => [{ type: "department", id: "list" }],
    }),
    deleteDepartment: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/department/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete", "success");
        });
      },
      invalidatesTags: () => ["department"],
    }),
    UpdateDepartment: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/department/${id}`,
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
      invalidatesTags: () => ["department"],
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentEndPoint;
