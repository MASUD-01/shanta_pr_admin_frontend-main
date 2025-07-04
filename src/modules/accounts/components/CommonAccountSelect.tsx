import { debounce } from 'lodash';
import { Select, Form, Col, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useGetAllAccountQuery } from '../api/AccountEndPoints';

const CommonAccountSelect = ({
  name,
  required,
  label,
  md,
  lg,
  onSelect,
  margin,
  customLabel,
  xl,
  placeholder,
}: {
  name: string | string[];
  required?: boolean;
  label?: boolean;
  md?: number;
  lg?: number;
  xl?: number;
  onSelect?: any;
  margin?: string;
  customLabel?: boolean;
  placeholder?: string;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const { data } = useGetAllAccountQuery(
    searchValue
      ? {
          account_name: searchValue,
        }
      : {}
  );

  const debouncesSetSearchValue = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 500),
    []
  );
  const handleSearch = (searchValue: string) => {
    debouncesSetSearchValue(searchValue);
  };

  return (
    <>
      <Col xs={24} sm={24} md={md || 8} lg={lg || 8} xl={xl || lg}>
        {customLabel && (
          <div>
            <Typography.Text>Select Account</Typography.Text>
          </div>
        )}

        <Form.Item
          style={{ marginBottom: margin ? margin : '24px' }}
          name={name}
          label={label ? <>Account</> : ''}
          rules={[{ required: required, message: 'Client is required' }]}
        >
          <Select
            allowClear
            showSearch
            onChange={(e, singleData) => {
              onSelect && onSelect(e, singleData);
              if (!e) {
                setSearchValue('');
              }
            }}
            onSelect={onSelect}
            placeholder={placeholder || 'Select account'}
            style={{ width: '100%' }}
            options={
              data?.data?.length
                ? data?.data?.map((acc) => ({
                    value: acc.id,
                    label: `${acc.name} `,
                  }))
                : []
            }
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? '')?.includes(
                input?.toLowerCase()
              )
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            onSearch={handleSearch}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default CommonAccountSelect;
