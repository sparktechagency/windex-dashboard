import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: (arg) => ({
        url: "/reports",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.reports],
    }),
    changeReportStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reports/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
  }),
});

export const { useGetAllReportsQuery, useChangeReportStatusMutation } =
  reportApi;
