import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.package],
    }),

    getPackages: builder.query({
      query: (arg) => ({
        url: "/packages",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.package],
    }),

    getSinglePackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.package],
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [tagTypes.package],
    }),
    updatePackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: [tagTypes.package],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetPackagesQuery,
  useGetSinglePackageQuery,
  useDeletePackageMutation,
  useUpdatePackageMutation,
} = packageApi;
