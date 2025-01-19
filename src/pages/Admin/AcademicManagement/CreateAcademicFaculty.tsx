/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import AFForm from "../../../Form/AFForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import AFSelect from "../../../Form/AFSelect";
import { academicFacultyOptions } from "../../../constants/academicFaculty";
import { useAddAcademicFacultyMutation } from "../../../redux/features/Admin/AcademicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation(undefined);
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating");
    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (res?.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <AFForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicFacultySchema)}>
          <AFSelect
            name="name"
            label="Faculty Name"
            options={academicFacultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </AFForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
