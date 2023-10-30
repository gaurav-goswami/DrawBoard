import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISendOtpResponse } from "../../Interface";

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<string, ISendOtpResponse>({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }),
    }),

    signUp: builder.mutation({
      query: (signUpDetails) => ({
        url: "/auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetails),
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
        credentials: "include",
      }),
    }),
  }),
});

export const {useSendOtpMutation, useSignUpMutation, useLoginMutation} = authApi;