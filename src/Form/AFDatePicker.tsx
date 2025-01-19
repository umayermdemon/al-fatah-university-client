import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label: string;
};
const AFDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <DatePicker {...field} style={{ width: "100%" }} />
        </Form.Item>
      )}
    />
  );
};

export default AFDatePicker;
