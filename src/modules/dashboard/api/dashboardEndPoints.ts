import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import {
  IDashboardData,
  IViewProfitLossDashboard,
} from "../types/dashboardTypes";

export const dashboardEndPoints = api.injectEndpoints({
  endpoints: (build) => ({
    getDashBoardData: build.query<HTTPResponse<IDashboardData>, void>({
      query: () => {
        return {
          url: `/erp/dashboard`,
        };
      },
      // providesTags: ["expense"],
    }),

    getDashboardProfitLoss: build.query<
      HTTPResponse<IViewProfitLossDashboard[]>,
      void
    >({
      query: () => {
        return {
          url: `/erp/report/bar-chart-profit-loss`,
        };
      },
      providesTags: ["dashboardProfitLoss"],
      //   providesTags: () => [{ type: "invoice", id: "list" }],
    }),
  }),
});

export const { useGetDashBoardDataQuery, useGetDashboardProfitLossQuery } =
  dashboardEndPoints;
