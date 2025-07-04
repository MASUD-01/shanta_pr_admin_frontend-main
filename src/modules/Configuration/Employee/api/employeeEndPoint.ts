import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/notification";
import {
  IEmployee,
  IEmployeeParams,
  ISingleEmployee,
  ISubmitData,
} from "../types/employeeTypes";

export const employeeEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<HTTPResponse<IEmployee[]>, IEmployeeParams>({
      query: (params) => {
        return {
          url: `/erp/employee`,
          params,
        };
      },
      providesTags: () => [{ type: "employee", id: "list" }],
    }),
    getSingleEmployee: build.query<HTTPResponse<ISingleEmployee>, number>({
      query: (id) => {
        return {
          url: `/erp/employee/${id}`,
        };
      },
      providesTags: () => [{ type: "employee", id: "list" }],
    }),
    createEmployee: build.mutation<unknown, { data: ISubmitData }>({
      query: ({ data }) => {
        return {
          url: `/erp/employee`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        // try {
        //   const result: any = await queryFulfilled;
        //   if (result.data && result.data.success) {
        //     notification("Successfully employee create ", "success");
        //   } else {
        //     const errorMessage = result.error?.data?.message;
        //     notification(errorMessage as string, "error");
        //   }
        // } catch (err: any) {
        //   notification(err.error?.data?.message as string, "error");
        // }
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully employee create ", "success");
        });
      },
      invalidatesTags: () => [{ type: "employee", id: "list" }],
    }),
    UpdateEmployee: build.mutation<unknown, { data: ISubmitData; id: number }>({
      query: ({ data, id }) => {
        return {
          url: `/erp/employee/${id}`,
          method: "PUT",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        // try {
        //   const result: any = await queryFulfilled;
        //   if (result.data && result.data.success) {
        //     notification("Successfully employee create ", "success");
        //   } else {
        //     const errorMessage = result.error?.data?.message;
        //     notification(errorMessage as string, "error");
        //   }
        // } catch (err: any) {
        //   notification(err.error?.data?.message as string, "error");
        // }
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully employee update ", "success");
        });
      },
      invalidatesTags: () => [{ type: "employee", id: "list" }],
    }),
    deleteEmployee: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/employee/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete employee", "success");
        });
      },
      invalidatesTags: () => [{ type: "employee", id: "list" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetSingleEmployeeQuery,
  useDeleteEmployeeMutation,
} = employeeEndPoint;
