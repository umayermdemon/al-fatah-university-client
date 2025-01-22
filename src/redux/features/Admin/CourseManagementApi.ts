import { TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const CourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TSemester[]>) => ({
        data: response?.data,
        // meta: response?.meta,
      }),
      providesTags: ["semester"],
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    deleteSemesterRegistration: builder.mutation({
      query: (id) => ({
        url: `/semester-registrations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["semester"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,
} = CourseManagementApi;
