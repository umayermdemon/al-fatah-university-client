import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/Admin/UserManagementApi";

const AdminDetails = () => {
  const { adminId } = useParams();
  console.log(adminId);
  const { data: adminData } = useGetSingleAdminQuery(adminId as string);
  console.log(adminData);
  return (
    <div>
      <h1>This is StudentDetails component for {adminData?.data?.email}</h1>
    </div>
  );
};

export default AdminDetails;
