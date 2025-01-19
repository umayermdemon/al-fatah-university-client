import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInput = {
  type: string;
  name: string;
  label: string;
};

const AFInput = ({ type, name, label }: TInput) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
            {error && (
              <small style={{ color: "red" }}>Please filled this field</small>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AFInput;
