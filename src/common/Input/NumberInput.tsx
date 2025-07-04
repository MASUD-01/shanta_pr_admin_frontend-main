import { InputNumber } from "antd";

const NumberInput = () => {
  return (
    <InputNumber
      min={0}
      style={{ width: "100%" }}
      defaultValue={100}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    />
  );
};

export default NumberInput;
