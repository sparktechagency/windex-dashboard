import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const appLaunchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegisteredUsersForApp: builder.query({
      query: (arg) => ({
        url: "/schedule",
        method: "GET",
        params: arg,
      }),
    }),
  }),
});

export const { useGetRegisteredUsersForAppQuery } = appLaunchApi;
