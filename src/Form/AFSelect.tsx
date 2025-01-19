import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TSelectProps = {
  name: string;
  label: string;
  options?: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const AFSelect = ({ name, label, options, disabled }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default AFSelect;
