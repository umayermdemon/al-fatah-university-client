import { useParams } from "react-router-dom";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import AFForm from "../../../Form/AFForm";
import AFInput from "../../../Form/AFInput";
import AFSelect from "../../../Form/AFSelect";
import AFDatePicker from "../../../Form/AFDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { genderOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/Admin/AcademicManagementApi";
import { useGetSingleStudentQuery } from "../../../redux/features/Admin/UserManagementApi";

const StudentUpdate = () => {
  const { studentId } = useParams();
  console.log(studentId);
  const { data: studentData } = useGetSingleStudentQuery(studentId as string);
  console.log(studentData);
  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);
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
  const studentDefaultValues = {
    student: {
      name: {
        firstName: studentData?.data?.name?.firstName,
        middleName: studentData?.data?.name?.middleName,
        lastName: studentData?.data?.name?.lastName,
      },
      gender: studentData?.data?.gender,
      email: studentData?.data?.email,
      contactNo: studentData?.data?.contactNo,
      emergencyContactNo: "1987654328",
      presentAddress: "123 Main Street, Springfield",
      permanentAddress: "456 Elm Street, Springfield",
      guardian: {
        fatherName: "Robert Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "1234567890",
        motherName: "Alice Doe",
        motherOccupation: "Teacher",
        motherContactNo: "1987654321",
      },
      localGuardian: {
        name: "Michael Smith",
        occupation: "Doctor",
        contactNo: "1122334455",
        address: "789 Pine Street, Springfield",
      },
    },
  };
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);
    console.log(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <AFForm onSubmit={onsubmit} defaultValues={studentDefaultValues}>
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

export default StudentUpdate;
