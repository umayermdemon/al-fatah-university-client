import {
  TAcademicSemesterData,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";
import { baseApi } from "../../api/baseApi";

const AcademicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TAcademicSemesterData[]>
      ) => {
        return {
          data: response?.data,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: () => {
        // const params = new URLSearchParams();
        // if (args) {
        //   args.forEach((item: TQueryParam) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }
        return {
          url: "/academic-faculties",
          method: "GET",
          // params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
        };
      },
    }),
    getFacultyByName: builder.query({
      query: (name: string) => {
        return {
          url: `/academic-faculties/byName/${name}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useGetAllFacultiesQuery,
  useGetFacultyByNameQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
} = AcademicManagementApi;
