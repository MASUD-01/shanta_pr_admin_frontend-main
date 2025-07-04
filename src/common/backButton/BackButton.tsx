import { Button, Tooltip } from "antd";

import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Tooltip placement="top" title={"Back"}>
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        size="small"
        style={{ marginBottom: "1rem" }}
      >
        <ArrowLeftOutlined />
      </Button>
    </Tooltip>
  );
};

export default BackButton;
