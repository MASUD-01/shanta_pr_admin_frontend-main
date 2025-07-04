import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/notification";
import {
  IProjectService,
  IProjectServiceParams,
} from "../types/ProjectCategoryTypes";

export const CreateProjectEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getCreateProject: build.query<
      HTTPResponse<IProjectService[]>,
      IProjectServiceParams
    >({
      query: (params) => {
        return {
          url: `/erp/project-category`,
          params,
        };
      },
      providesTags: () => ["project-category"],
    }),

    createProject: build.mutation<unknown, { data: any }>({
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
    updateCreateProject: build.mutation<unknown, { id: number; data: any }>({
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
    }),
    deleteCreateProject: build.mutation<unknown, number>({
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
  useCreateProjectMutation,
  useGetCreateProjectQuery,
  useDeleteCreateProjectMutation,
  useUpdateCreateProjectMutation,
} = CreateProjectEndPoint;
