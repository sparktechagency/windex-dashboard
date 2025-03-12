import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPresentCustomersByClass: builder.query({
      query: ({ classId, arg }) => ({
        url: `/attendance/class/${classId}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.attendance],
    }),
  }),
});

export const { useGetAllPresentCustomersByClassQuery } = attendanceApi;
