/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Form } from 'antd';
import { debounce } from 'lodash';
import { useCallback } from 'react';

interface IProps {
  options: any[];
  placeholder?: string;
  label?: string;
  name?: string | any[];
  rules?: any;
  value?: any;
  onSelect?: any;
  onChange?: any;
  defaultValue?: any;
  disabled?: any;
  onSearch?: any;
  width?: number;
  margin?: string;
}

export const SearchAbleSelectInput = ({
  options,
  placeholder,
  label,
  name,
  rules,
  onSelect,
  value,
  onSearch,
  defaultValue,
  disabled,
  width,
  margin,
}: IProps) => {
  const handleSearch = useCallback(
    debounce((value: string) => {
      onSearch?.(value);
    }, 300),
    []
  );
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={defaultValue}
      style={{ marginBottom: margin ? margin : '24px' }}
    >
      <Select
        disabled={disabled}
        allowClear
        showSearch
        value={value}
        defaultValue={defaultValue}
        onChange={onSelect}
        onSelect={onSelect}
        onSearch={(e: string) => {
          handleSearch(e);
        }}
        placeholder={placeholder}
        style={{ width: width ? `${width}px` : '100%' }}
        options={options}
        optionFilterProp='children'
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? '').includes(input?.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').localeCompare(optionB?.label ?? '')
        }
      />
    </Form.Item>
  );
};
