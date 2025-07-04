import { Button, ButtonProps } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react';

type Props = {
  loading?: boolean;
  label?: string;
  icon?: React.ReactNode;
  size?: SizeType;
} & ButtonProps;

const SubmitButton = ({ loading, label, icon, size, ...rest }: Props) => {
  return (
    <Button size={size} type='primary' loading={loading} icon={icon} {...rest}>
      {label || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
