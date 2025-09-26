import { baseApi } from "./baseApi";
import { tagTypes } from "../tagtypes";

const refundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRefundRequests: builder.query({
      query: (params) => ({
        url: "/refund-requests",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.refundRequest],
    }),
    changeRefundStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/refund-requests/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.refundRequest],
    }),
  }),
});

export const { useGetRefundRequestsQuery, useChangeRefundStatusMutation } =
  refundApi;
