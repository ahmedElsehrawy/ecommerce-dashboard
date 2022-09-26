import { Select } from "antd";

const { Option } = Select;

interface Props {
  placeholder: string;
  onChange: any;
  onSearch: any;
  values: any;
  defaultValue?: any;
}

const CustomSelect = (props: Props) => {
  const { placeholder, onChange, onSearch, values, defaultValue } = props;
  console.log(
    "🚀 ~ file: CustomSelect.tsx ~ line 15 ~ CustomSelect ~ defaultValue",
    defaultValue
  );

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={defaultValue && defaultValue.name}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {values &&
        values.map((value: any) => (
          <Option key={value.id} value={value.id}>
            {value.name}
          </Option>
        ))}
    </Select>
  );
};

export default CustomSelect;
