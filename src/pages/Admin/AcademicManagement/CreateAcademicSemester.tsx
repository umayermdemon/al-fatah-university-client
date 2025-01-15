import { Button, Col, Flex } from "antd";
import AFSelect from "../../../Form/AFSelect";
import AFForm from "../../../Form/AFForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicManagementSchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicSemester = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    console.log(semesterData);
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
