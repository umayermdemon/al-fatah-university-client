import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/Admin/UserManagementApi";
import { Link } from "react-router-dom";
type TTableData = Pick<
  TStudent,
  "_id" | "fullName" | "id" | "email" | "contactNo"
>;
const Students = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);
  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo, academicDepartment }) => ({
      key: _id,
      _id,
      id,
      fullName,
      email,
      contactNo,
      academicDepartment,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
      //   showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Academic Department",
      key: "academicDepartment?.data?.name",
      dataIndex: "academicDepartment?.data?.name",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-details/${item.id}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item.id}`}>
              <Button>Update</Button>
            </Link>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };
  return (
    <Table<TTableData>
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default Students;
