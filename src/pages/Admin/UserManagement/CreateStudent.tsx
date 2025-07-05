import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import AFForm from "../../../Form/AFForm";
import AFInput from "../../../Form/AFInput";
import AFSelect from "../../../Form/AFSelect";
import { genderOptions } from "../../../constants/global";
import AFDatePicker from "../../../Form/AFDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/Admin/AcademicManagementApi";
import { useAddStudentMutation } from "../../../redux/features/Admin/UserManagementApi";
import { toast } from "sonner";
import { TRes } from "../../../types";

const CreateStudent = () => {
  const { data: sData, isLoading: sIsLoading } = useGetAllAcademicSemesterQuery(
    [{ name: "sort", value: "year" }]
  );
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }));
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });
  const departmentOptions = dData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );
  const [addStudent] = useAddStudentMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const studentData = {
        password: "student123",
        student: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.profileImg);
      const res: TRes = await addStudent(formData);
      if (res.error) {
        toast.error(res?.error?.data?.errorSources[0]?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Row>
      <Col span={24}>
        <AFForm onSubmit={onsubmit}>
          <Row gutter={8}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="First Name" name="name.firstName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Middle Name" name="name.middleName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Last Name" name="name.lastName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Email" name="email" type="email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Contact Number" name="contactNo" type="Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Emergency Contact Number"
                name="emergencyContactNo"
                type="Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Present Address"
                name="presentAddress"
                type="address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Permanent Address"
                name="permanentAddress"
                type="address"
              />
            </Col>
            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="fatherName"
                name="guardian.fatherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Father Occupation"
                name="guardian.fatherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Father Contact Number"
                name="guardian.fatherContactNo"
                type="Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Mother Name"
                name="guardian.motherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Mother Occupation"
                name="guardian.motherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Mother Contact Number"
                name="guardian.motherContactNo"
                type="Number"
              />
            </Col>
            <Divider>Local Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Name" name="localGuardian.name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Occupation"
                name="localGuardian.occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Contact Number"
                name="localGuardian.contactNo"
                type="Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Address"
                name="localGuardian.address"
                type="address"
              />
            </Col>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                label="Admission Semester"
                name="admissionSemester"
                options={semesterOptions}
                disabled={sIsLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                label="Academic Department"
                name="academicDepartment"
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <div
            style={{
              textAlign: "center",
            }}>
            <Button htmlType="submit" size="large">
              Submit
            </Button>
          </div>
        </AFForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
