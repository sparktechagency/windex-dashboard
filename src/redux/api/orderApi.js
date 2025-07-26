import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (arg) => ({
        url: "/orders",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.orders],
    }),
    changeOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.orders],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
