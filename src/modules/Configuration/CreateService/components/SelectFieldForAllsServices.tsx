/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Button, Col, Form, Select, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../app/store/store';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateClientCategory from '../../ClientCategory/components/CreateClientCategory';

const SelectFieldForAllsServices = ({
  name,
  required,
  label,
  md,
  lg,
  onSelect,
  onChange,
  margin,
  customLabel,
  xl,
  plainLabel,
}: {
  name: string | (string | number)[];
  required?: boolean;
  label?: boolean;
  md?: number;
  lg?: number;
  xl?: number;
  onSelect?: any;
  onChange?: any;
  margin?: string;
  customLabel?: boolean;
  plainLabel?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Add Services',
        content: <CreateClientCategory />,
        show: true,
        width: 1000,
      })
    );
  };
  return (
    <>
      <Col xs={24} sm={24} md={md || 8} lg={lg || 8} xl={xl || lg}>
        {customLabel && (
          <div>
            <Typography.Text>Select Service</Typography.Text>
          </div>
        )}

        <Form.Item
          style={{ marginBottom: margin ? margin : '24px' }}
          name={name}
          label={
            label ? (
              <>
                Service
                <Button
                  type='primary'
                  size={'small'}
                  icon={<PlusOutlined />}
                  onClick={showModal}
                  style={{ marginLeft: '5px' }}
                >
                  Add Service
                </Button>
              </>
            ) : plainLabel ? (
              'Select Service'
            ) : (
              ''
            )
          }
          rules={[{ required: required, message: 'Service is required' }]}
        >
          <Select
            allowClear
            showSearch
            onChange={(e) => {
              // onSelect && onSelect(e);
              onChange && onChange(e);
              if (!e) {
                setSearchValue('');
              }
            }}
            onSelect={onSelect && onSelect}
            placeholder='Select Service'
            style={{ width: '100%' }}
            options={[
              { label: 'Plumbing', price: 150, id: 1 },
              { label: 'Electrical', price: 180, id: 2 },
              { label: 'Painting', price: 250, id: 3 },
              { label: 'Cleaning', price: 100, id: 4 },
            ].map((item) => ({
              ...item,
              value: item.id,
              label: `${item.label} (${item.price}৳)`,
            }))}
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
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default SelectFieldForAllsServices;
