import { TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const UserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: TResponseRedux<TStudent[]>) => {
      //   return {
      //     data: response.data,
      //   };
      // },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: () => ({
        url: "/faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (id: string) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: TResponseRedux<TStudent[]>) => {
      //   return {
      //     data: response.data,
      //   };
      // },
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    getAllAdmins: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (id: string) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: TResponseRedux<TStudent[]>) => {
      //   return {
      //     data: response.data,
      //   };
      // },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useGetSingleFacultyQuery,
  useGetSingleStudentQuery,
} = UserManagementApi;
