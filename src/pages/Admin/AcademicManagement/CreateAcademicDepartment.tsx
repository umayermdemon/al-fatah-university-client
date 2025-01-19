import { FieldValues, SubmitHandler } from "react-hook-form";
import AFForm from "../../../Form/AFForm";
import { Button, Col, Row } from "antd";
import AFSelect from "../../../Form/AFSelect";
import {
  academicDepartmentOptions,
  Faculty,
  facultyNames,
} from "../../../constants/academicDepartment";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/Admin/AcademicManagementApi";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicDepartment";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    try {
      const departmentData = {
        name: data.name,
      };
      console.log(departmentData);
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      if (res.error?.data?.message) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  return (
    <Row>
      <Col span={24}>
        <AFForm onSubmit={onsubmit}>
          {/* <Row gutter={8}>
            {facultyNames?.map((faculty) => (
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <AFSelect
                  key={faculty}
                  name="name"
                  label={`Academic Department For ${faculty}`}
                  options={academicDepartmentOptions(faculty)}
                />
              </Col>
            ))}
          </Row> */}
          <Row gutter={8}>
            {facultyNames?.map((faculty) => (
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <AFSelect
                  key={faculty}
                  name="name"
                  label={`Academic Department For ${faculty}`}
                  options={academicDepartmentOptions(faculty as Faculty)}
                />
              </Col>
            ))}
          </Row>
          {/* <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                key="Arts and Humanities"
                name="name"
                label={`Academic Department For Arts and Humanities`}
                options={academicDepartmentOptions("Arts and Humanities")}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                key="Arts and Humanities"
                name="name"
                label={`Academic Department For Arts and Humanities`}
                options={academicDepartmentOptions("Arts and Humanities")}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                key="Arts and Humanities"
                name="name"
                label={`Academic Department For Arts and Humanities`}
                options={academicDepartmentOptions("Arts and Humanities")}
              />
            </Col>
          </Row> */}
          <Row
            style={{
              marginLeft: "10px",
              gap: "15px",
              display: "flex",
              flexWrap: "wrap",
            }}>
            <Button htmlType="submit">Submit</Button>
          </Row>
        </AFForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicDepartment;
