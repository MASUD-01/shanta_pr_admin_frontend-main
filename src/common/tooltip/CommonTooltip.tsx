import { Tooltip } from "antd";

const CommonTooltip = ({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip placement="top" title={title}>
      {children}
    </Tooltip>
  );
};

export default CommonTooltip;
