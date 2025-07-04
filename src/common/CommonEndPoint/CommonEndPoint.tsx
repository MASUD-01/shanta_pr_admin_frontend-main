/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../app/api/userApi/api';
import { HTTPResponse } from '../../app/utils/commonTypes';
import { IAllClient } from '../../modules/Client/types/ClientTypes';
import { IClientCategory } from '../../modules/Configuration/ClientCategory/types/ClientCategoryTypes';
import { IEmployee } from '../../modules/Configuration/Employee/types/employeeTypes';
import { IExpenseHead } from '../../modules/Configuration/Expense/types/ExpenseTypes';
import { IProduct } from '../../modules/Configuration/Products/types/ProductTypes';
import { IAllSource } from '../../modules/Configuration/Source/types/SourceTypes';
import { IAccountGroup } from '../../modules/accounts/types/AccountTypes';
import { IAccountHead } from '../Types/CommonTypes';

export const CommonEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAccountHeadSelect: build.query<HTTPResponse<IAccountHead[]>, void>({
      query: () => {
        return {
          url: `/account/head/select`,
        };
      },
    }),
    getCommonGroup: build.query<HTTPResponse<IAccountGroup[]>, void>({
      query: () => {
        return {
          url: `/account/group`,
        };
      },
    }),
    getCommonExpenseHead: build.query<HTTPResponse<IExpenseHead[]>, void>({
      query: () => {
        return {
          url: `/erp/expense-head`,
        };
      },
      providesTags: () => [{ type: 'expense-head', id: 'list' }],
    }),
    getCommonClientCategory: build.query<HTTPResponse<IClientCategory[]>, void>(
      {
        query: () => {
          return {
            url: `/erp/client-category`,
          };
        },
        providesTags: () => [{ type: 'client-category', id: 'list' }],
      }
    ),
    getCommonSource: build.query<HTTPResponse<IAllSource[]>, any>({
      query: (params) => {
        return {
          url: `/erp/source`,
          params,
        };
      },
      providesTags: () => [{ type: 'source', id: 'list' }],
    }),
    getCommonClient: build.query<HTTPResponse<IAllClient[]>, void>({
      query: () => {
        return {
          url: `/erp/client`,
        };
      },
      providesTags: () => [{ type: 'client', id: 'list' }],
    }),
    getCommonProduct: build.query<HTTPResponse<IProduct[]>, any>({
      query: (params) => {
        return {
          url: `/erp/product`,
          params,
        };
      },
      providesTags: () => [{ type: 'product', id: 'list' }],
    }),
    getCpmmonEmployees: build.query<HTTPResponse<IEmployee[]>, void>({
      query: () => {
        return {
          url: `/erp/employee`,
        };
      },
      providesTags: () => [{ type: 'employee', id: 'list' }],
    }),
  }),
});

export const {
  useGetAccountHeadSelectQuery,
  useGetCommonGroupQuery,
  useGetCommonExpenseHeadQuery,
  useGetCommonClientCategoryQuery,
  useGetCommonSourceQuery,
  useGetCommonClientQuery,
  useGetCommonProductQuery,
  useGetCpmmonEmployeesQuery,
} = CommonEndPoint;
