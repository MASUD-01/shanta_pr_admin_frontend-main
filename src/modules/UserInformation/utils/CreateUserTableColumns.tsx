/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { DeleteIcon, EditButton } from "../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { IUserDetails } from "../types/UserInfoTypes";
import { useDeleteCreateFlatDetailsMutation } from "../api/AddFlatEndPoint";
import UpdateUserDetailsCategory from "../component/UpdateUserDetailsCategory";

export const CreateUserTableColumns =
  (): TableProps<IUserDetails>["columns"] => {
    const dispatch = useDispatch();
    const [deleteCreateService] = useDeleteCreateFlatDetailsMutation();

    const confirm = (id: number) => {
      if (id) {
        deleteCreateService(id);
      }
    };

    const showModal = (record: IUserDetails) => {
      dispatch(
        setCommonModal({
          title: "Edit User Details",
          content: <UpdateUserDetailsCategory record={record} />,
          show: true,
        })
      );
    };

    return [
      {
        title: "SL",
        key: "sl",
        render: (_text, _record, index) => index + 1,
      },
      {
        title: "Owner Name",
        dataIndex: "full_name_owner",
        key: "full_name_owner",
      },
      {
        title: "Tenant Name",
        dataIndex: "full_name_tenant",
        key: "full_name_tenant",
      },
      {
        title: "Owner Email",
        dataIndex: "email_owner",
        key: "email_owner",
      },
      {
        title: "Tenant Email",
        dataIndex: "email_tenant",
        key: "email_tenant",
      },
      {
        title: "Owner Phone",
        dataIndex: "phone_number_owner",
        key: "phone_number_owner",
      },
      {
        title: "Tenant Phone",
        dataIndex: "phone_number_tenant",
        key: "phone_number_tenant",
      },
      {
        title: "Address",
        dataIndex: "Address",
        key: "Address",
      },
      {
        title: "PAN Number",
        dataIndex: "pan_number",
        key: "pan_number",
      },
      {
        title: "Assigned Flat",
        dataIndex: "assigned_flat",
        key: "assigned_flat",
      },
      {
        title: "Lease Start Date",
        dataIndex: "lease_start_date",
        key: "lease_start_date",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "Lease End Date",
        dataIndex: "lease_end_date",
        key: "lease_end_date",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "Actions",
        key: "actions",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <EditButton onClick={() => showModal(record)} />
            <DeleteIcon
              title="Delete user"
              onConfirm={() => confirm(record.id)}
            />
          </div>
        ),
      },
    ];
  };
