import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (arg) => ({
        url: "/users",
        method: "GET",
        params: arg,

        providesTags: [tagTypes.users],
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PUT",
        body: data,
      }),

      invalidatesTags: [tagTypes.user],
    }),

    changeUserStatus: builder.mutation({
      query: (payload) => ({
        url: `/users/change-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    getSubAdmins: builder.query({
      query: (arg) => ({
        url: "/users/sub-admin",
        method: "GET",
        params: arg,
        providesTags: [tagTypes.subAdmin],
      }),
    }),
    addSubAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/invitation-sub-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subAdmin],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useChangeUserStatusMutation,
  useGetSubAdminsQuery,
  useAddSubAdminMutation,
} = userApi;
