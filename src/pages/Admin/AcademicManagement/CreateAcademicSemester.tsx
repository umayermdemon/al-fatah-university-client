/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Col, Flex } from "antd";
import AFSelect from "../../../Form/AFSelect";
import AFForm from "../../../Form/AFForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicManagementSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/Admin/AcademicManagementApi";
import { toast } from "sonner";
import { TAcademicSemesterData, TResponse } from "../../../types";

const CreateAcademicSemester = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemesterData>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <AFForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicManagementSchema)}>
          <AFSelect name="name" label="Name" options={semesterOptions} />
          <AFSelect name="year" label="Year" options={yearOptions} />
          <AFSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <AFSelect name="endMonth" label="End Month" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </AFForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
