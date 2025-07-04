// import { IMeetingPerson } from "../types/meetingPersonsTypes";

import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/notification";
import { ISingleAdmin, IUser } from "../types/adminTypes";

export const adminEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmin: build.query<HTTPResponse<IUser[]>, void>({
      query: () => {
        return {
          url: `/erp/user`,
        };
      },
      providesTags: () => [{ type: "admin", id: "list" }],
    }),

    getSingleAdmin: build.query<HTTPResponse<ISingleAdmin>, number>({
      query: (id) => {
        return {
          url: `/erp/user/${id}`,
        };
      },
      providesTags: () => [{ type: "admin", id: "list" }],
    }),
    createAdmin: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/user`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully create admin", "success");
        });
      },
      invalidatesTags: () => [{ type: "admin", id: "list" }],
    }),
    updateAdmin: build.mutation<unknown, { data: any; id: number }>({
      query: ({ data, id }) => {
        return {
          url: `/erp/user/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully update admin", "success");
        });
      },
      invalidatesTags: () => [{ type: "admin", id: "list" }],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminQuery,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} = adminEndPoint;
