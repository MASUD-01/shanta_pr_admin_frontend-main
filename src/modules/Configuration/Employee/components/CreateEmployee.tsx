/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button, Select, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import { DateInput } from '../../../../common/fromItemCommon/SelectCustomField';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { IFromData, ISubmitData } from '../types/employeeTypes';
import { useCreateEmployeeMutation } from '../api/employeeEndPoint';
import { useEffect, useState } from 'react';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import { BloodGroup } from '../../../../common/staticData/staticData';
import { validateMobileNumber } from '../../../../common/phoneNumberValidator';
import { removeUndefinedAndNull } from '../../../../app/utils/removeUndefinedAndNull';
import { SearchAbleSelectInput } from '../../../../common/Input/SearchAbleSelectInput';
import { useGetDepartmentQuery } from '../../Department/api/departmentEndPoint';
import { useGetDesignationQuery } from '../../Designation/api/DesignationEndPoints';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [searchDesignation, setDesignation] = useState('');
  const { data: departments } = useGetDepartmentQuery({});
  const { data: designation } = useGetDesignationQuery(
    searchDesignation ? { name: searchDesignation } : {}
  );
  const [form] = Form.useForm();
  const [createEmployee, { isLoading, isSuccess }] =
    useCreateEmployeeMutation();

  const onFinish = (values: IFromData) => {
    const SubmitData: ISubmitData = {
      ...values,
      appointment_date: dayjs(values.appointment_date).format('YYYY-MM-DD'),
      joining_date: dayjs(values.joining_date).format('YYYY-MM-DD'),
      date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
    };
    const formateData = removeUndefinedAndNull(SubmitData);
    createEmployee({ data: formateData });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);
  return (
    <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form
          layout='vertical'
          form={form}
          onFinish={onFinish}
          initialValues={{
            joining_date: dayjs(),
            appointment_date: dayjs(),
          }}
        >
          <Card
            className='border'
            style={{
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            {' '}
            <Row align={'middle'} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name='name'
                  rules={[{ required: true }]}
                  label='Name'
                  required
                >
                  <Input placeholder='Employee Name' type='text' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item label='Email' name='email'>
                  <Input placeholder='Enter employee email' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name='mobile'
                  label='Mobile No'
                  rules={[{ required: true, validator: validateMobileNumber }]}
                >
                  <Input
                    addonBefore='+88'
                    placeholder='Mobile No'
                    type='number'
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <SearchAbleSelectInput
                  label='Department'
                  name='department_id'
                  placeholder='select department'
                  options={
                    departments?.data?.length
                      ? departments?.data.map((department) => {
                          return {
                            label: department.name,
                            value: department.id,
                          };
                        })
                      : []
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <SearchAbleSelectInput
                  label='Designation'
                  name='designation_id'
                  placeholder='select designation'
                  options={
                    designation?.data?.length
                      ? designation?.data.map((designation) => {
                          return {
                            label: designation.name,
                            value: designation.id,
                          };
                        })
                      : []
                  }
                  onSearch={(e: string) => setDesignation(e)}
                />
              </Col>

              <Col xs={24} sm={24} md={8}>
                <Form.Item name='salary' label='Salary'>
                  <InputNumber
                    placeholder='Salary'
                    type='number'
                    min={0}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ',')
                    }
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item name='commission' label='Commission'>
                  <Input placeholder='Commission(%)' type='number' />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={8}>
                <Form.Item label='Blood Group' name='blood_group'>
                  <Select
                    placeholder='Blood Group'
                    showSearch
                    options={BloodGroup}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <DateInput
                  label='Date of Birth'
                  name='date_of_birth'
                  placeholder='Date of Birth'
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <DateInput
                  label='Appointment Date'
                  name='appointment_date'
                  placeholder='Appointment Date'
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <DateInput
                  label='Joining Date'
                  name='joining_date'
                  placeholder='Joining Date'
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item name='address' label='Address'>
                  <TextArea rows={3} placeholder='Address' />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'end' }}>
              <Button
                htmlType='submit'
                type='primary'
                icon={<SendOutlined />}
                loading={isLoading}
              >
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateEmployee;
