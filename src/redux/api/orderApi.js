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
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
