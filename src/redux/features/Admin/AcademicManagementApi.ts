import { TAcademicSemester, TQueryParam, TResponseRedux } from "../../../types";
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
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
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
    getAllAcademicFaculties: builder.query({
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
    getAcademicFacultyByName: builder.query({
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
    getSingleAcademicDepartment: builder.query({
      query: (id: string) => ({
        url: `/academic-departments/${id}`,
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
  useGetAllAcademicFacultiesQuery,
  useGetAcademicFacultyByNameQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
  useGetSingleAcademicDepartmentQuery,
} = AcademicManagementApi;
