/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { DeleteIcon, EditButton } from "../../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useDeleteCreateServiceMutation } from "../api/CreateServiceEndPoint";
import UpdateCreateService from "../components/UpdateCreateService";
import { ICreateService } from "../types/ClientCategoryTypes";

export const CreateServiceTableColumns =
  (): TableProps<ICreateService>["columns"] => {
    const dispatch = useDispatch();
    const [deleteCreateService] = useDeleteCreateServiceMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteCreateService(id);
      }
    };
    const showModal = (record: ICreateService) => {
      dispatch(
        setCommonModal({
          title: "Edit client category",
          content: <UpdateCreateService record={record} />,
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
        title: "Service Name",
        dataIndex: "service_name",
        key: "service_name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Actions",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <EditButton onClick={() => showModal(record)} />

            <DeleteIcon
              title="Delete source"
              onConfirm={() => confirm(record.id)}
            />
          </div>
        ),
      },
    ];
  };
