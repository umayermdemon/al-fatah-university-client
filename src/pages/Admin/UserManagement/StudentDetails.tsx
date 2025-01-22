import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/Admin/UserManagementApi";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);
  const { data: studentData } = useGetSingleStudentQuery(studentId as string);
  console.log(studentData);
  return (
    <div>
      <h1>This is StudentDetails component for {studentData?.data?.email}</h1>
    </div>
  );
};

export default StudentDetails;
