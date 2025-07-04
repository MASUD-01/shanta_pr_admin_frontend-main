/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { api } from '../../../app/api/userApi/api';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import {
  IAccountLedger,
  IAccountReport,
  IClientDiscount,
  IClientLedgerParams,
  IClientLedgerReport,
  IClientPaymentHistory,
  ICollectionReport,
  IInvestmentReport,
  ILoanReport,
  ISalesReport,
  ISubscriptionReport,
} from '../types/reportTypes';

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getClientLedger: build.query<
      HTTPResponse<IClientLedgerReport>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/client-ledger`,
          params,
        };
      },
      providesTags: () => ['clientLedger'],
    }),
    getClientDiscount: build.query<
      HTTPResponse<IClientDiscount[]>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/discount`,
          params,
        };
      },
    }),
    getAccountReport: build.query<
      HTTPResponse<IAccountReport>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/account-report`,
          params,
        };
      },
    }),
    getAccountLedger: build.query<
      HTTPResponse<IAccountLedger[]>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/account-ledger`,
          params,
        };
      },
    }),
    getSalesReport: build.query<
      HTTPResponse<ISalesReport[]>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/sales-report`,
          params,
        };
      },
    }),
    getSubscriptionReport: build.query<
      HTTPResponse<ISubscriptionReport[]>,
      any
    >({
      query: (params) => {
        return {
          url: `/erp/report/subscription`,
          params,
        };
      },
    }),
    getCollectionReport: build.query<
      HTTPResponse<ICollectionReport[]>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/collection-report`,
          params,
        };
      },
    }),

    getProfitLossReport: build.query<HTTPResponse<any>, IClientLedgerParams>({
      query: (params) => {
        return {
          url: `/erp/report/profit-loss`,
          params,
        };
      },
    }),

    getInvestmentReport: build.query<
      HTTPResponse<IInvestmentReport>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/investment-report`,
          params,
        };
      },
    }),

    getLoanReport: build.query<HTTPResponse<ILoanReport>, IClientLedgerParams>({
      query: (params) => {
        return {
          url: `/erp/report/loan-report`,
          params,
        };
      },
    }),

    getClientPaymentHistoryReport: build.query<
      HTTPResponse<IClientPaymentHistory[]>,
      IClientLedgerParams
    >({
      query: (params) => {
        return {
          url: `/erp/report/client-payment-history`,
          params,
        };
      },
    }),
  }),
});

export const {
  useLazyGetClientLedgerQuery,
  useLazyGetSalesReportQuery,
  useLazyGetCollectionReportQuery,
  useLazyGetClientPaymentHistoryReportQuery,
  useGetClientDiscountQuery,
  useLazyGetClientDiscountQuery,
  useLazyGetAccountReportQuery,
  useGetAccountLedgerQuery,
  useLazyGetAccountLedgerQuery,
  useLazyGetProfitLossReportQuery,
  useLazyGetInvestmentReportQuery,
  useLazyGetLoanReportQuery,
  useLazyGetSubscriptionReportQuery,
} = reportEndPoint;
