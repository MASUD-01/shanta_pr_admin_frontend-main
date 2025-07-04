/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Select, Form, Input, Space, FormItemProps, SelectProps } from 'antd';
import SubmitButton from '../../common/submitButton/SubmitButton';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../app/slice/modalSlice';
const { Option } = Select;


type IProps={
label?:string
formItemProps?:FormItemProps
  selectFieldProps?: SelectProps;
}
const CreateProject = ({label,formItemProps,selectFieldProps}:IProps) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState(['Building A', 'Building B']);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Building',
        content: (
          <Form form={form} layout='vertical' name='projectForm'>
            <Form.Item
              label='Building Name'
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
     
        name={'building_name'}
        label={
          <Space>
            <span> {label||'Select Building'} </span>
            {/* <SubmitButton
              icon={<FaPlus size={13} />}
              label='Add Building'
              size='small'
              onClick={showModal}
            /> */}
          </Space>
        }
        rules={[
          {
            required: true,
          },
        ]}

        {...formItemProps}
      >
        <Select
          style={{ width: '100%' }}
          placeholder={label||'Select '}
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

export default CreateProject;
