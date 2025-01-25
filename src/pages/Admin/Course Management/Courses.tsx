import { Button, Space, Table, TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/Admin/CourseManagementApi";
import { TCourses } from "../../../types/course.type";
type TTableData = Pick<TCourses, "_id" | "title" | "prefix" | "credits">;

const Courses = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);
  const tableData = courseData?.data?.map(
    ({ _id, title, prefix, credits }) => ({
      _id,
      title,
      prefix,
      credits,
      // preRequisiteCourses,
      key: _id,
    })
  );

  // const handleStatusUpdate = async (data: any) => {
  //   const toastId = toast.loading("Updating....", { style: loadingStyle });
  //   const updateData = {
  //     id: semesterId,
  //     data: {
  //       status: data?.key,
  //     },
  //   };
  //   try {
  //     const res: TRes = await updateStatus(updateData);
  //     if (res.error) {
  //       toast.error(res?.error?.data?.message, {
  //         style: errorStyle,
  //         id: toastId,
  //       });
  //     } else {
  //       toast.success(res.data.message, { style: successStyle, id: toastId });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const menuProps = {
  //   items,
  //   onClick: (info: object) => handleStatusUpdate(info),
  // };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      key: "prefix",
      dataIndex: "prefix",
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
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

export default Courses;
