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
  }),
});

export const {useGetMetaDataQuery} = dashboardApi;
