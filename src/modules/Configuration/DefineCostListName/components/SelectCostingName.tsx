/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Select, Form, Input, Space, FormItemProps, SelectProps } from 'antd';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import SubmitButton from '../../../../common/submitButton/SubmitButton';

const { Option } = Select;


type IProps={
  formItemProps?: FormItemProps
  selectFieldProps?:SelectProps
}
const SelectCostingName = ({
  formItemProps,
  selectFieldProps
 
}:IProps) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    'Utility Costs',
    'Monthly Operating Costs',
    "Billable Charges ",
  ]);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Costing Name',
        content: (
          <Form form={form} layout='vertical' name='projectForm'>
            <Form.Item
              label='Project Name'
              name='buildingName'
              rules={[
                { required: true, message: 'Please enter a project name' },
              ]}
            >
              <Input placeholder='Enter new project name' />
            </Form.Item>
            <Form.Item>
              <SubmitButton htmlType='submit' onClick={showModal} />
            </Form.Item>
          </Form>
        ),
        show: true,
        width: 700,
      })
    );
  };

  return (
    <>
      <Form.Item
        label={
          <Space>
            <span>Select Costing Name</span>
            {/* <SubmitButton
              icon={<FaPlus size={13} />}
              label='Add Project'
              size='small'
              onClick={showModal}
            /> */}
          </Space>
        }
        required
        rules={[
          {
            required: true,
          },
        ]}

        {...formItemProps}
      >
        <Select

          style={{ width: '100%' }}
         
          value={selected}
          onChange={(value) => setSelected(value)}

          {...selectFieldProps}
        >
          {items.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default SelectCostingName;
