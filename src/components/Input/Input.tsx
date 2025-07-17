import { Form, Input } from "antd";
import type { Rule } from "antd/es/form";

interface MyInputProps {
  label: string;
  name?: string;
  type?: string;
  required?: boolean;
  rules?: Rule[];
  placeholder?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  label,
  name = label.toLowerCase(),
  type = "text",
  required = true,
  rules = [],
  placeholder,
}) => {
  return (
    <Form.Item
      className="w-full"
      name={name}
      label={label}
      rules={[
        {
          type: "string",
          message: `Invalid ${label}`,
        },
        ...(required ? [{ required: true, message: `Please Enter ${label}` }] : []),
        ...rules,
      ]}
    >
      <Input
        type={type}
        placeholder={placeholder || label}
        count={{ show: true, max: 20 }}
        minLength={3}
        aria-label={label}
      />
    </Form.Item>
  );
};

export default MyInput;