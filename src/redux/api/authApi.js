import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: { otp: data.otp },
        headers: { token: `${data?.token}` },
      }),

      invalidatesTags: [tagTypes.otp],
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/resend-otp",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.otp],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.auth],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),

    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: { Authorization: `${token}` },
      }),

      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),

    getAllUser: builder.query({
      query: (query) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user, tagTypes.auth],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.auth],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
  }),

  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
