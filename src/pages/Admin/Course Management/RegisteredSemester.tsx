import { Button, Dropdown, Space, Table, TableColumnsType, Tag } from "antd";
import { TRes, TSemester } from "../../../types";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/Admin/CourseManagementApi";
import { useState } from "react";
import { toast } from "sonner";
type TTableData = Pick<TSemester, "_id" | "endDate" | "startDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
const RegisteredSemester = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [updateStatus] = useUpdateSemesterRegistrationMutation();
  const [semesterId, setSemesterId] = useState("");
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      _id,
      name: `${academicSemester.name}-${academicSemester?.year}`,
      status,
      startDate,
      endDate,
      key: _id,
    })
  );

  const handleStatusUpdate = async (data: any) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data?.key,
      },
    };
    try {
      const res: TRes = await updateStatus(updateData);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const menuProps = {
    items,
    onClick: (info: object) => handleStatusUpdate(info),
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Dropdown menu={menuProps} trigger={["click"]} placement="bottom">
              <Button onClick={() => setSemesterId(item._id)}>Update</Button>
            </Dropdown>
            <Button color="danger" variant="outlined">
              Delete
            </Button>
          </Space>
        );
      },
      width: "10%",
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra?.action === "filter") {
  //       const queryParams: TQueryParam[] = [];
  //       filters.name?.forEach((item) => {
  //         queryParams.push({ name: "name", value: item });
  //       });
  //       filters.year?.forEach((item) => {
  //         queryParams.push({ name: "year", value: item });
  //       });
  //       setParams(queryParams);
  //     }
  //   };
  return (
    <Table<TTableData>
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      //   onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
