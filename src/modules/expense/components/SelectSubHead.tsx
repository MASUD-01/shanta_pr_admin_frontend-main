import { debounce } from 'lodash';
import { Select, Form, Col } from 'antd';
import { useMemo, useState } from 'react';
import { useGetExpenseSubHeadQuery } from '../../Configuration/Expense/api/ExpenseEndPoint';

const SelectSubHead = ({
  name,
  required,
  label,
  md,
  lg,
  onSelect,
  margin,
  onChange,
  xl,
  getExpenseHead,
}: {
  name: string | string[];
  required?: boolean;
  label?: string;
  md?: number;
  lg?: number;
  xl?: number;
  onSelect?: any;
  margin?: string;
  customLabel?: boolean;
  getExpenseHead?: number;
  onChange?: (e: any) => void;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const { data: subheads } = useGetExpenseSubHeadQuery(
    getExpenseHead && !searchValue
      ? { head_id: getExpenseHead, limit: 100 }
      : searchValue
      ? { head_id: getExpenseHead, name: searchValue }
      : { limit: 100 }
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
        <Form.Item
          style={{ marginBottom: margin ? margin : '24px' }}
          name={name}
          label={label ? label : ''}
          rules={[{ required: required, message: 'SubHead is required' }]}
        >
          <Select
            allowClear
            showSearch
            onChange={(e) => {
              onChange && onChange(e);
              onSelect && onSelect(e);
              if (!e) {
                setSearchValue('');
              }
            }}
            onSelect={onSelect}
            placeholder='Select subhead'
            style={{ width: '100%' }}
            options={
              subheads?.data?.length
                ? subheads?.data?.map((subhead) => ({
                    value: subhead.id,
                    label: `${subhead.expense_sub_head_name} `,
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

export default SelectSubHead;
