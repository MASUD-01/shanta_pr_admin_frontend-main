/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import { useCreateFlatDetailsMutation } from '../api/AddFlatEndPoint';
import { IUserDetailsCategory } from '../types/UserInfoTypes';
import SubmitButton from '../../../common/submitButton/SubmitButton';

const { Option } = Select;

const CreateUserDetailsCategory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createFlatDetailsCategory, { isLoading, isSuccess }] =
    useCreateFlatDetailsMutation();

  const onFinish = (values: IUserDetailsCategory) => {
    const payload = {
      ...values,
      lease_start_date: values.lease_start_date?.valueOf(),
      lease_end_date: values.lease_end_date?.valueOf(),
    };
    createFlatDetailsCategory({ data: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <Form layout='vertical' form={form} onFinish={onFinish}>
      <Row gutter={24}>
        {/* Owner Info */}
        <Col xs={24} md={12}>
          <Card bordered>
            <h2>Owner Information</h2>
            <p style={{ marginBottom: '1.5rem', color: '#888' }}>
              Property owner details
            </p>

            <Form.Item
              name='full_name_owner'
              label='Full Name'
              rules={[{ required: true, message: "Please enter owner's name" }]}
            >
              <Input placeholder="Owner's full name" />
            </Form.Item>

            <Form.Item
              name='email_owner'
              label='Email'
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input placeholder='owner@example.com' />
            </Form.Item>

            <Form.Item
              name='phone_number_owner'
              label='Phone Number'
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder='Phone number' type='number' />
            </Form.Item>

            <Form.Item
              name='Address'
              label='Address'
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea placeholder="Owner's address" />
            </Form.Item>

            <Form.Item
              name='pan_number'
              label='PAN Number'
              rules={[{ required: true, message: 'Please enter PAN number' }]}
            >
              <Input placeholder='PAN number' type='number' />
            </Form.Item>

            <Form.Item>
              <SubmitButton loading={isLoading} label='Save Owner' />
            </Form.Item>
          </Card>
        </Col>

        {/* Tenant Info */}
        <Col xs={24} md={12}>
          <Card bordered>
            <h2>Tenant Information</h2>
            <p style={{ marginBottom: '1.5rem', color: '#888' }}>
              Tenant details and lease information
            </p>

            <Form.Item
              name='full_name_tenant'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter tenant's name" },
              ]}
            >
              <Input placeholder="Tenant's full name" />
            </Form.Item>

            <Form.Item
              name='email_tenant'
              label='Email'
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input placeholder='tenant@example.com' />
            </Form.Item>

            <Form.Item
              name='phone_number_tenant'
              label='Phone Number'
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder='Phone number' type='number' />
            </Form.Item>

            <Form.Item
              name='assigned_flat'
              label='Assigned Flat'
              rules={[{ required: true, message: 'Please select flat' }]}
            >
              <Select placeholder='Select flat'>
                <Option value='flat-1'>Flat 1</Option>
                <Option value='flat-2'>Flat 2</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='lease_start_date'
                  label='Lease Start Date'
                  rules={[{ required: true, message: 'Start date required' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='lease_end_date'
                  label='Lease End Date'
                  rules={[{ required: true, message: 'End date required' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateUserDetailsCategory;
