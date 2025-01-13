import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import OfferedCourses from "../pages/Faculty/OfferedCourses";

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
