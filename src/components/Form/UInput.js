import { useFormContext, Controller } from "react-hook-form";
import { Form, Input } from "antd";

const UInput = ({
  type,
  name,
  label,
  size,
  placeholder,
  defaultValue,
  disabled = false,
  labelStyles = {},
  className,
  prefix,
  suffix,
  style,
  max,
  required,
}) => {
  const { control } = useFormContext(); // 🔥 must have this

  return (
    <Controller
      name={name}
      control={control} // 🔥 this connects field to form
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              size={size}
              placeholder={placeholder}
              className={className}
            />
          ) : (
            <Input
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
              prefix={prefix}
              suffix={suffix}
              style={style}
              max={max}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default UInput;
