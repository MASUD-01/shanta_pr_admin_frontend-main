import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/notification";
import { IFlatDetails, IFlatDetailsParams } from "../types/UserInfoTypes";

export const AddFlatEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAddFlats: build.query<HTTPResponse<IFlatDetails[]>, IFlatDetailsParams>({
      query: (params) => {
        return {
          url: `/erp/project-category`,
          params,
        };
      },
      providesTags: () => ["project-category"],
    }),

    createFlatDetails: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/project-category`,
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
      invalidatesTags: () => ["project-category"],
    }),
    updateCreateFLatDetails: build.mutation<unknown, { id: number; data: any }>(
      {
        query: ({ id, data }) => {
          return {
            url: `/erp/project-category/${id}`,
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
        invalidatesTags: () => ["project-category"],
      }
    ),
    deleteCreateFlatDetails: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/project-category/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete", "success");
        });
      },
      invalidatesTags: () => ["project-category"],
    }),
  }),
});

export const {
  useCreateFlatDetailsMutation,
  useGetAddFlatsQuery,
  useDeleteCreateFlatDetailsMutation,
  useUpdateCreateFLatDetailsMutation,
} = AddFlatEndPoint;
