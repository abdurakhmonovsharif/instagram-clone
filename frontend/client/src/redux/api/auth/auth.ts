import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "../baseApi";

export const auth = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: (builder) => ({
    login: builder.mutation<User, Partial<User | null>>({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
    }),
    register: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = auth;
