import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query({
      query: (query) => ({
        url: `/notification`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.notification],
      transformResponse: (response) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    markAsRead: builder.mutation({
      query: () => ({
        url: `/notification`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteNotification: builder.mutation({
      query: () => ({
        url: `/notification/my-notifications`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteSingleNotificationMutation,
} = notificationApi;
