import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: (arg) => ({
        url: "/payments/earnings",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.earnings],
    }),
  }),
});

export const { useGetEarningsQuery } = earningsApi;
