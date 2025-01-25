/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Col, Flex, Row } from "antd";
import AFSelect from "../../../Form/AFSelect";
import AFForm from "../../../Form/AFForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/Admin/CourseManagementApi";
import AFInput from "../../../Form/AFInput";
import { TRes } from "../../../types";
import { toast } from "sonner";
import {
  errorStyle,
  loadingStyle,
  successStyle,
} from "../../../utils/toastColor";

const CreateCourse = () => {
  const { data: cData } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();
  const courseOptions = cData?.data?.map((item: any) => ({
    value: item._id,
    label: item?.title,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....", { style: loadingStyle });
    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data?.code),
      credits: Number(data?.credits),
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res: TRes = await addCourse(courseData);
      if (res.error) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          style: errorStyle,
        });
      } else {
        toast.success(res?.data?.message, { id: toastId, style: successStyle });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, style: errorStyle });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Row>
        <Col span={24}>
          <AFForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={12}>
                <AFInput name="title" label="Course Title" type="text" />
              </Col>
              <Col span={12}>
                <AFInput name="prefix" label="Prefix" type="text" />
              </Col>
              <Col span={12}>
                <AFInput name="code" label="Course Code" type="Number" />
              </Col>
              <Col span={12}>
                <AFInput name="credits" label="Course Credits" type="Number" />
              </Col>
              <Col span={12}>
                <AFSelect
                  mode="multiple"
                  name="preRequisiteCourses"
                  label="Pre-Requisite Courses"
                  options={courseOptions}
                />
              </Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <Button htmlType="submit">Submit</Button>
            </div>
          </AFForm>
        </Col>
      </Row>
    </Flex>
  );
};

export default CreateCourse;
