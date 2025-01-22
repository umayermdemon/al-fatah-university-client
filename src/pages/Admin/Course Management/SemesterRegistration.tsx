/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Col, Flex, Row } from "antd";
import AFSelect from "../../../Form/AFSelect";
import AFForm from "../../../Form/AFForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/Admin/CourseManagementApi";
import { TResponse } from "../../../types";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicManagementApi";
import { semesterRegistrationOptions } from "../../../constants/semesterRegistration";
import AFDatePicker from "../../../Form/AFDatePicker";
import AFInput from "../../../Form/AFInput";

const SemesterRegistration = () => {
  const { data: sData } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }));
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    const semesterData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };
    try {
      const res = (await addSemesterRegistration(
        semesterData
      )) as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Row>
        <Col span={24}>
          <AFForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={12}>
                <AFSelect
                  name="academicSemester"
                  label="Academic Semester"
                  options={semesterOptions}
                />
              </Col>
              <Col span={12}>
                <AFSelect
                  name="status"
                  label="Status"
                  options={semesterRegistrationOptions}
                />
              </Col>
              <Col span={12}>
                <AFDatePicker label="Start Date" name="startDate" />
              </Col>
              <Col span={12}>
                <AFDatePicker label="End Date" name="endDate" />
              </Col>
              <Col span={12}>
                <AFInput label="Min. Credit" name="minCredit" type="text" />
              </Col>
              <Col span={12}>
                <AFInput label="Max. Credit" name="maxCredit" type="text" />
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

export default SemesterRegistration;
