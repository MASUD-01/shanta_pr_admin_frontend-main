import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/notification";
import {
  IBillingAndService,
  IBillingAndServiceParams,
} from "../types/BillingAndServicesTypes";

export const CreateServiceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getCreateService: build.query<
      HTTPResponse<IBillingAndService[]>,
      IBillingAndServiceParams
    >({
      query: (params) => {
        return {
          url: `/erp/billing-category`,
          params,
        };
      },
      providesTags: () => ["billing-category"],
    }),

    createService: build.mutation<unknown, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/erp/billing-category`,
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
      invalidatesTags: () => ["billing-category"],
    }),
    updateCreateService: build.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/billing-category/${id}`,
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
      invalidatesTags: () => ["billing-category"],
    }),
    deleteCreateService: build.mutation<unknown, number>({
      query: (id) => {
        return {
          url: `/erp/billing-category/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully delete", "success");
        });
      },
      invalidatesTags: () => ["billing-category"],
    }),
  }),
});

// export const {
//   useBillingAndServiceMutation,
//   useGetBillingAndServiceQuery,
//   useDeleteBillingAndServiceMutation,
//   useUpdateBillingAndServiceMutation,
// } = CreateServiceEndPoint;
