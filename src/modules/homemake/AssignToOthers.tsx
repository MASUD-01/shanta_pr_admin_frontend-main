import { Card, Col, Row, Form, Input, Select } from 'antd';
import SubmitButton from '../../common/submitButton/SubmitButton';

const { Option } = Select;
const AssignToOthers = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form layout='vertical' onFinish={onFinish}>
      <Card
        className='border'
        style={{
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        <Row align={'middle'} gutter={[5, 0]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              name='status'
              label='Select Person'
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select placeholder='Select person'>
                <Option value='approve'>Mominul Islam</Option>
                <Option value='reject'>Jahid Hasan </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              noStyle
              shouldUpdate={(prev, curr) => prev.status !== curr.status}
            >
              {({ getFieldValue }) =>
                (
                  <Form.Item
                    name='reject_reason'
                    label='Note'
                  
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder='Enter Note'
                    />
                  </Form.Item>
                ) 
              }
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Form.Item style={{ marginTop: '1rem' }}>
        <div style={{ textAlign: 'start' }}>
          <SubmitButton htmlType='submit' />
        </div>
      </Form.Item>
    </Form>
  );
};

export default AssignToOthers;


