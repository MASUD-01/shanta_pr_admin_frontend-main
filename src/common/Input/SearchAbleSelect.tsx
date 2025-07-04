import { Select } from "antd";
interface Option {
  value: number;
  label: string;
}
const SearchAbleSelect = ({
  options,
  placeholder,
}: {
  options: Option[];
  placeholder: string;
}) => {
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
    />
  );
};

export default SearchAbleSelect;
