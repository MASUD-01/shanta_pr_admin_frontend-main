/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Input, InputNumber } from 'antd';

import { NamePath } from 'antd/es/form/interface';
import { ReactChild } from 'react';

type Props = {
  name: NamePath;
  label: string | ReactChild;
  required?: boolean;
  size?: number;
  md?: number;
  lg?: number;
  numberType?: boolean;
  disabled?: boolean;
  rules?: any;
  placeholder?: string;
  handleQuantity?: ((value?: any) => void) | undefined;
  handleAttribute?: (value?: any) => void;
  quantity?: number;
  value?: any;
  onChange?: any;
  defaultValue?: any;
  extra?: any;
  suffix?: any;
};

const FormInput = ({
  name,
  label,
  size,
  numberType,
  rules,
  disabled,
  placeholder,
  value,
  onChange,
  defaultValue,
  md,
  lg,
  extra,
  suffix,
}: Props) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={md || 10}
      lg={lg || 4}
      xxl={size || 12}
      style={{ position: 'relative' }}
    >
      <Form.Item label={label} name={name} rules={rules}>
        {numberType ? (
          <InputNumber
            controls={false}
            onChange={onChange}
            // onChange={(e: any) => {
            //   handleQuantity && handleQuantity(e);
            //   handleAttribute && handleAttribute(e);
            // }}
            defaultValue={defaultValue}
            value={value}
            type={'number'}
            placeholder={placeholder}
            style={{ width: '100%' }}
            disabled={disabled || false}
            min={0}
            suffix={suffix && <>{suffix}</>}
          />
        ) : (
          <Input disabled={disabled || false} value={value} />
        )}
      </Form.Item>

      <span
        style={{
          position: 'absolute',
          top: 75,
          left: 15,
          color: 'rgb(14 174 213)',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {Number(extra) ? extra : ''}
      </span>
    </Col>
  );
};

export default FormInput;
