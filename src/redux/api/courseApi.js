import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (arg) => ({
        url: "/classes/admin",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.courses],
    }),

    getSingleCourse: builder.query({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/classes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.courses],
    }),

    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.courses],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.courses],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
