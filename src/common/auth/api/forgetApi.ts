/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import notification from "../../Notification/notification";

export const forgetPassEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getOTP: build.mutation<void, any>({
      query: (body) => ({
        url: `/common/otp/send`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully OTP Send", "success");
        });
      },
    }),

    matchOtp: build.mutation<any, any>({
      query: (body) => ({
        url: `/common/otp/match`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully OTP Match", "success");
        });
      },
    }),

    resetPassword: build.mutation<any, any>({
      query: (body) => ({
        url: `/auth/erp/reset-password`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("Successfully change password", "success");
          // toasterNotification("success", "Successfully change password");
        });
      },
    }),
  }),
});

export const {
  useGetOTPMutation,
  useMatchOtpMutation,
  useResetPasswordMutation,
} = forgetPassEndpoint;
