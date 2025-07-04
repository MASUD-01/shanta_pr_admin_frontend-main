/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tag } from "antd";

// import { DeleteIcon } from "../../../../common/icon/Icon";
import { TableProps } from "antd/lib";
import { IEmployee } from "../types/employeeTypes";
import dayjs from "dayjs";
import { DeleteIcon, EyeIcon } from "../../../../common/icon/Icon";
import { useDeleteEmployeeMutation } from "../api/employeeEndPoint";
import { CustomLink } from "../../../../common/CustomLink";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const EmployeeTableColumns = (
  employeeSub: any
): TableProps<IEmployee>["columns"] => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteEmployee(id);
    }
  };
  return [
    {
      title: "SL",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      key: "joining_date",
      render: (joining_date) => dayjs(joining_date).format("DD-MM-YYYY"),
    },
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <CustomLink to={`${record?.id}`}>
            <EyeIcon />
          </CustomLink>

          {/* <CommonTooltip title={"History"}>
            <Button size="small" type="primary">
              History
            </Button>
          </CommonTooltip> */}

          {employeeSub?.permissions?.delete && (
            <DeleteIcon
              title={"Delete employee"}
              onConfirm={() => confirm(record?.id)}
            />
          )}
        </Space>
      ),
    },
  ];
};
