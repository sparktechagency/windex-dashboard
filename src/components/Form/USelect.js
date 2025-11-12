"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Select, Form } from "antd";

const RHFSelect = ({
  name,
  label,
  placeholder,
  options = [],
  size = "middle",
  mode,
  showSearch = false,
  filterOption,
  style = {},
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // important for RHF
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Select
            value={value || undefined} // important to prevent resetting
            onChange={(val) => onChange(val)}
            options={options}
            placeholder={placeholder}
            size={size}
            mode={mode}
            showSearch={showSearch}
            filterOption={filterOption}
            style={{ ...style, height: style?.height || "48px" }}
          />
        </Form.Item>
      )}
    />
  );
};

export default RHFSelect;
