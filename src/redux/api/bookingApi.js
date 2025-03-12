import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (arg) => ({
        url: "/bookings",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.bookings],
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;
