/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IExpenseHead, IExpenseSubHeadReport } from "../types/reportTypes";

export const expenseReportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    expenseReport: build.query<HTTPResponse<IExpenseSubHeadReport[]>, any>({
      query: (params) => {
        return {
          url: `/erp/report/expense-report`,
          params,
        };
      },
    }),
    userList: build.query<HTTPResponse<unknown[]>, any>({
      query: () => {
        return {
          url: `/erp/user`,
        };
      },
    }),
    expenseHeadReport: build.query<HTTPResponse<IExpenseHead[]>, any>({
      query: (params) => {
        return {
          url: `/erp/report/expense-report-head`,
          params,
        };
      },
    }),
    expenseSubHeadReport: build.query<
      HTTPResponse<IExpenseSubHeadReport[]>,
      any
    >({
      query: (params) => {
        return {
          url: `/erp/report/expense-report-sub-head`,
          params,
        };
      },
    }),
  }),
});

export const {
  useExpenseReportQuery,
  useLazyExpenseReportQuery,
  useLazyExpenseHeadReportQuery,
  useLazyExpenseSubHeadReportQuery,
  useUserListQuery,
} = expenseReportEndPoint;
