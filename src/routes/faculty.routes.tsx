import FacultyDashboard from "../pages/UserManagement/Faculty/FacultyDashboard";
import OfferedCourses from "../pages/UserManagement/Faculty/OfferedCourses";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offeredCourses",
    element: <OfferedCourses />,
  },
];
