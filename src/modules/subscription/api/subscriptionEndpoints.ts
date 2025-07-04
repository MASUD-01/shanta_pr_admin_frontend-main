import { api } from '../../../app/api/userApi/api';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../common/Notification/notification';
import {
  IRenewType,
  ISubscriptionFilter,
  ISubscriptionListType,
  ISubscriptionTracking,
  ISubscriptionType,
  IUpdateType,
} from '../type/subscriptiontype';

export const subscriptionEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSubsCription: build.query<
      HTTPResponse<ISubscriptionListType[]>,
      ISubscriptionFilter
    >({
      query: (params) => {
        return {
          url: `/erp/subscription`,
          params,
        };
      },
      providesTags: () => ['subscription'],
    }),
    subscriptionTracking: build.query<HTTPResponse<ISubscriptionTracking>, any>(
      {
        query: (params) => {
          console.log(params);
          return {
            url: `/erp/subscription/${params?.id}/tracking?from_date=${params?.from_date}&to_date=${params?.to_date}`,
          };
        },
        providesTags: () => ['subscription'],
      }
    ),

    createSubscription: build.mutation<
      any,
      { subscription: ISubscriptionType[] }
    >({
      query: ({ subscription }) => {
        return {
          url: `/erp/subscription`,
          method: 'POST',
          body: { subscription: subscription },
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully Subscription create ', 'success');
        });
      },
      invalidatesTags: () => [
        'subscription',
        'clientLedger',
        { type: 'permission', id: 'permission' },
        { type: 'User', id: 'profile' },
      ],
    }),
    updateSubscription: build.mutation<any, { id: number; data: IUpdateType }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/subscription/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update subscription', 'success');
        });
      },
      invalidatesTags: () => ['subscription'],
    }),
    deleteSubscription: build.mutation<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/erp/subscription/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully deleted subscription', 'success');
        });
      },
      invalidatesTags: () => ['subscription'],
    }),
    renewSubscription: build.mutation<any, { id: number; data: IRenewType }>({
      query: ({ id, data }) => {
        return {
          url: `/erp/subscription/${id}/renew`,
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('Successfully update subscription', 'success');
        });
      },
      invalidatesTags: () => ['subscription'],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useRenewSubscriptionMutation,
  useGetAllSubsCriptionQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSubscriptionTrackingQuery,
} = subscriptionEndpoints;
