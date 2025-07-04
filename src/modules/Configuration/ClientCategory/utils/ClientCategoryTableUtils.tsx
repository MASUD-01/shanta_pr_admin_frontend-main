/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { IClientCategory } from "../types/ClientCategoryTypes";
import { DeleteIcon, EditButton } from "../../../../common/icon/Icon";
import { useDeleteClientCategoryMutation } from "../api/ClientCategoryEndPoint";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import UpdateClientCategory from "../components/UpdateClientCategory";

export const ClientCategoryTableColumns = (
  clientCategorySub: any
): TableProps<IClientCategory>["columns"] => {
  const dispatch = useDispatch();
  const [deleteClientCategory] = useDeleteClientCategoryMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteClientCategory(id);
    }
  };
  const showModal = (record: IClientCategory) => {
    dispatch(
      setCommonModal({
        title: "Edit client category",
        content: <UpdateClientCategory record={record} />,
        show: true,
      })
    );
  };
  return [
    {
      title: "SL",
      key: "id",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // {
    //   title: "Prefix Start",
    //   dataIndex: "prefix_start",
    //   key: "prefix_start",
    // },
    {
      title: "Actions",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {clientCategorySub?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )}

          {clientCategorySub?.permissions?.delete && (
            <DeleteIcon
              title="Delete source"
              onConfirm={() => confirm(record.id)}
            />
          )}
        </div>
      ),
    },
  ];
};
