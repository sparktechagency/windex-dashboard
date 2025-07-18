import { baseApi } from "./baseApi";
import { tagTypes } from "../tagtypes";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlists: builder.query({
      query: (params) => ({
        url: "/wishlists",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.wishlist],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),
    changeWishlistStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlists/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),
  }),
});

export const { useGetWishlistsQuery, useDeleteWishlistMutation, useChangeWishlistStatusMutation } = wishlistApi;
