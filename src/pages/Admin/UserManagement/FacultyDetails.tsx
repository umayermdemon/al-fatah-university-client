import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../redux/features/Admin/UserManagementApi";

const FacultyDetails = () => {
  const { facultyId } = useParams();
  console.log(facultyId);
  const { data: facultyData } = useGetSingleFacultyQuery(facultyId as string);
  console.log(facultyData);
  return (
    <div>
      <h1>This is StudentDetails component for {facultyData?.data?.email}</h1>
    </div>
  );
};

export default FacultyDetails;
