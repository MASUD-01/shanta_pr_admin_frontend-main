/* eslint-disable prefer-const */
import { RootState } from '../store/store';
import { setLogout } from '../features/userSlice';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';

const baseURL = 'http://10.10.220.45:9966/api/v1'; //srabon

// const baseURL = 'https://erp-single-entry-sass-server.m360ictapi.com/api/v1'; //main

export const imageURL =
  'https://m360ict.s3.ap-south-1.amazonaws.com/erp-files/';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);

  if (
    result?.error?.status === 401 ||
    result?.error?.status === 'CUSTOM_ERROR' ||
    result?.error?.status === 'FETCH_ERROR' ||
    result?.error?.status === 'PARSING_ERROR' ||
    result?.error?.status === 'TIMEOUT_ERROR'
  ) {
    api.dispatch(setLogout());
  }

  return result;
};
