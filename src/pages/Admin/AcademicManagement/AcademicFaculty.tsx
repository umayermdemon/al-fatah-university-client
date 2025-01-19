/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllFacultiesQuery } from "../../../redux/features/Admin/AcademicManagementApi";

interface DataType {
  key: React.Key;
  name: string;
}
const AcademicFaculty = () => {
  const { data: AcademicFacultyData } = useGetAllFacultiesQuery(undefined);
  const tableData = AcademicFacultyData?.data?.map(({ name }) => ({
    name,
    key: name,
  }));
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      // render: (text: string) => <a>{text}</a>,
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: DataType[]) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };

  return (
    <Table<DataType>
      rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default AcademicFaculty;
