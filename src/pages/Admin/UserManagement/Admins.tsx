import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllAdminsQuery } from "../../../redux/features/Admin/UserManagementApi";
type TTableData = Pick<
  TStudent,
  "_id" | "fullName" | "id" | "email" | "contactNo"
>;
const Admins = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: adminData, isFetching } = useGetAllAdminsQuery(params);
  console.log(adminData);
  const tableData = adminData?.data?.map(
    ({ _id, id, fullName, email, contactNo }: any) => ({
      key: _id,
      _id,
      id,
      fullName,
      email,
      contactNo,
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
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/admin-details/${item.id}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/admin-update/${item.id}`}>
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

export default Admins;
