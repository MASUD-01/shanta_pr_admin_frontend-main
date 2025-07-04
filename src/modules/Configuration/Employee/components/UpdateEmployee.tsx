/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  IFromData,
  ISingleEmployee,
  ISubmitData,
} from '../types/employeeTypes';
import { BloodGroup } from '../../../../common/staticData/staticData';
import { DateInput } from '../../../../common/fromItemCommon/SelectCustomField';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useUpdateEmployeeMutation } from '../api/employeeEndPoint';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import { validateMobileNumber } from '../../../../common/phoneNumberValidator';
import { useGetDesignationQuery } from '../../Designation/api/DesignationEndPoints';
import { useGetDepartmentQuery } from '../../Department/api/departmentEndPoint';
import { removeUndefinedAndNull } from '../../../../app/utils/removeUndefinedAndNull';

const UpdateEmployee = ({ employee }: { employee: ISingleEmployee }) => {
  const dispatch = useDispatch();
  const { data: departments } = useGetDepartmentQuery({});
  const { data: designation } = useGetDesignationQuery({});
  const [form] = Form.useForm();
  const [UpdateEmployee, { isLoading, isSuccess }] =
    useUpdateEmployeeMutation();
  useEffect(() => {
    if (employee) {
      form.setFieldValue('name', employee.name);
      form.setFieldValue('email', employee.email);
      form.setFieldValue('department_id', employee.department_id);
      form.setFieldValue('designation_id', employee.designation_id);
      form.setFieldValue('salary', employee.salary);
      form.setFieldValue('commission', employee.commission);
      form.setFieldValue('mobile', employee.mobile);
      form.setFieldValue('blood_group', employee.blood_group);
      form.setFieldValue(
        'date_of_birth',
        employee?.date_of_birth ? dayjs(employee?.date_of_birth) : ''
      );
      form.setFieldValue(
        'appointment_date',
        employee?.appointment_date ? dayjs(employee.appointment_date) : ''
      );
      form.setFieldValue(
        'joining_date',
        employee?.joining_date ? dayjs(employee.joining_date) : ''
      );
      form.setFieldValue('status', employee?.status ? 'true' : 'false');
      form.setFieldValue('address', employee.address);
    }
  }, [employee]);

  const onFinish = (values: IFromData) => {
    const SubmitData: ISubmitData = {
      ...values,
      appointment_date: dayjs(values.appointment_date).format('YYYY-MM-DD'),
      joining_date: dayjs(values.joining_date).format('YYYY-MM-DD'),
      date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
    };
    const formateData = removeUndefinedAndNull(SubmitData);
    UpdateEmployee({ data: formateData, id: employee.id });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  return (
    <>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form layout='vertical' form={form} onFinish={onFinish}>
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
                  <Form.Item name='name' label='Name'>
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
                    rules={[{ validator: validateMobileNumber }]}
                  >
                    <Input
                      addonBefore='+88'
                      placeholder='Mobile No'
                      type='number'
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label='Department' name='department_id'>
                    <Select
                      placeholder='select department'
                      showSearch
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
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item label='Designation' name='designation_id'>
                    <Select
                      placeholder='select designation'
                      showSearch
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
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item name='status' label='Status'>
                    <Select
                      options={[
                        { value: 'true', label: 'Active' },
                        { value: 'false', label: 'Inactive' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item name='salary' label='Salary'>
                    <Input placeholder='Salary' type='number' />
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
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UpdateEmployee;
