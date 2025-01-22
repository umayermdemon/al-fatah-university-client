import AcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty";
import AcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Courses from "../pages/Admin/Course Management/Courses";
import CreateCourse from "../pages/Admin/Course Management/CreateCourse";
import RegisteredSemester from "../pages/Admin/Course Management/RegisteredSemester";
import SemesterRegistration from "../pages/Admin/Course Management/SemesterRegistration";
import AdminDetails from "../pages/Admin/UserManagement/AdminDetails";
import Admins from "../pages/Admin/UserManagement/Admins";
import AdminUpdate from "../pages/Admin/UserManagement/AdminUpdate";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/UserManagement/CreateStudent";
import Faculties from "../pages/Admin/UserManagement/Faculties";
import FacultyDetails from "../pages/Admin/UserManagement/FacultyDetails";
import FacultyUpdate from "../pages/Admin/UserManagement/FacultyUpdate";
import StudentDetails from "../pages/Admin/UserManagement/StudentDetails";
import Students from "../pages/Admin/UserManagement/Students";
import StudentUpdate from "../pages/Admin/UserManagement/StudentUpdate";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students",
        element: <Students />,
      },
      {
        path: "student-details/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "student-update/:studentId",
        element: <StudentUpdate />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "create-faculties",
        element: <Faculties />,
      },
      {
        path: "faculty-details/:facultyId",
        element: <FacultyDetails />,
      },
      {
        path: "faculty-update/:facultyId",
        element: <FacultyUpdate />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admins",
        element: <Admins />,
      },
      {
        path: "admin-details/:adminId",
        element: <AdminDetails />,
      },
      {
        path: "admin-update/:adminId",
        element: <AdminUpdate />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
    ],
  },
];
