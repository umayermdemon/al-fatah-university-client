import { Table, TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types/academicDepartment";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicManagementApi";

const AcademicDepartment = () => {
  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);
  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, academicFaculty }: TAcademicDepartment) => {
      const facultyName = academicFaculty?.name;
      return {
        key: _id,
        _id,
        name,
        academicFaculty,
        facultyName,
      };
    }
  );
  console.log(academicDepartmentData?.data);
  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Name of Department",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Name of Academic Faculty",
      dataIndex: "facultyName",
      key: "facultyName",
      // render: (text) => <a>{text}</a>,
    },
  ];
  return (
    <Table<TAcademicDepartment> columns={columns} dataSource={tableData} />
  );
};

export default AcademicDepartment;
