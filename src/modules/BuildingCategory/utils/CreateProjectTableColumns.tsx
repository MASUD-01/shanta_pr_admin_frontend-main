/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { DeleteIcon, EditButton } from "../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { IProjectService } from "../types/ProjectCategoryTypes";
import UpdateProjectCategory from "../component/UpdateProjectCategory";

export const CreateProjectTableColumns =
  (): TableProps<IProjectService>["columns"] => {
    const dispatch = useDispatch();

    const showModal = (record: IProjectService) => {
      dispatch(
        setCommonModal({
          title: "Edit Project category",
          content: <UpdateProjectCategory record={record} />,
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
        dataIndex: "building_name",
        key: "building_name",
      },
      {
        title: "Building Code",
        dataIndex: "building_code",
        key: "building_code",
      },
      {
        title: "Total Floors",
        dataIndex: "total_floors",
        key: "total_floors",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
      },
      {
        title: "Pincode",
        dataIndex: "pincode",
        key: "pincode",
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
