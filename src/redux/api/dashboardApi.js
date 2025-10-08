import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: (query) => ({
        url: `/meta`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.metaData],
    }),
    getAnalytics: builder.query({
      query: (query) => ({
        url: `/meta/analysis`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.analytics],
    }),
  }),
});

export const { useGetMetaDataQuery, useGetAnalyticsQuery } = dashboardApi;
