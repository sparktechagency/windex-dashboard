import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const instructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstructors: builder.query({
      query: (query) => `/instructor?searchTerm=${query.searchTerm ?? ""}`,
      providesTags: [tagTypes.instructors],
    }),

    getSingleInstructor: builder.query({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.instructors],
    }),

    createInstructor: builder.mutation({
      query: (data) => ({
        url: "/instructor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.instructors],
    }),

    editInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/instructor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.instructors],
    }),

    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.instructors],
    }),
  }),
});

export const {
  useGetInstructorsQuery,
  useGetSingleInstructorQuery,
  useCreateInstructorMutation,
  useEditInstructorMutation,
  useDeleteInstructorMutation,
} = instructorApi;
