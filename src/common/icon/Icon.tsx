/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popconfirm, Tooltip } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export const EyeIcon = () => {
  return (
    <Tooltip placement="top" title={"View details"}>
      <Button size="small" type="primary" style={{ background: "#008000" }}>
        <FaRegEye />
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ onClick }: { onClick?: any }) => {
  return (
    <Tooltip placement="top" title={"Edit"}>
      <Button
        size="small"
        type="primary"
        style={{ background: "#00b4e9" }}
        onClick={onClick}
      >
        <FaRegEdit />
      </Button>
    </Tooltip>
  );
};

export const DeleteIcon = ({
  onConfirm,
}: {
  title?: string;
  onConfirm?: any;
}) => {
  return (
    <Popconfirm
      title="Sure to delete ?"
      okText="Yes"
      cancelText="No"
      onConfirm={onConfirm}
    >
      {" "}
      {/* <Tooltip placement="top" title={title}> */}
      <Button danger icon={<MdDelete size={20} />} size="small" />{" "}
      {/* </Tooltip> */}
    </Popconfirm>
  );
};
