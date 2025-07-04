import { Input } from 'antd';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const CommSearchInput = ({
  onChange,
  placeholder,
}: {
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const handleSearch = useCallback(
    debounce((value) => {
      onChange(value);
      console.log(value);
    }, 300),
    []
  );
  return (
    <Input
      allowClear
      placeholder={placeholder || 'Search..'}
      onChange={(e) => {
        handleSearch(e?.target?.value?.trim());
      }}
    />
  );
};

export default CommSearchInput;
