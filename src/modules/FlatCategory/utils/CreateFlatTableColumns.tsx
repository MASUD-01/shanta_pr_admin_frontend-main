/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { DeleteIcon, EditButton } from "../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { IFlatDetails } from "../types/FlatCategoryTypes";
import { useDeleteCreateFlatDetailsMutation } from "../api/AddFlatEndPoint";
import UpdateFlatDetailsCategory from "../component/UpdateFlatDetailsCategory";

export const CreateFlatTableColumns =
  (): TableProps<IFlatDetails>["columns"] => {
    const dispatch = useDispatch();
    const [deleteCreateService] = useDeleteCreateFlatDetailsMutation();

    const confirm = (id: number) => {
      if (id) {
        deleteCreateService(id);
      }
    };

    const showModal = (record: IFlatDetails) => {
      dispatch(
        setCommonModal({
          title: "Edit Flat Details",
          content: <UpdateFlatDetailsCategory record={record} />,
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
        title: "Building Name",
        dataIndex: "building_name",
        key: "building_name",
      },
      {
        title: "Flat Number",
        dataIndex: "flat_number",
        key: "flat_number",
      },
      {
        title: "Floor Number",
        dataIndex: "floor_number",
        key: "floor_number",
      },
      {
        title: "Flat Type",
        dataIndex: "flat_type",
        key: "flat_type",
      },
      {
        title: "Carpet Area (sq ft)",
        dataIndex: "carpet_area",
        key: "carpet_area",
      },
      {
        title: "Base Rent",
        dataIndex: "base_rent",
        key: "base_rent",
      },
      {
        title: "Security Deposit",
        dataIndex: "security_deposit",
        key: "security_deposit",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (status === "available" ? "Available" : "Occupied"),
      },
      {
        title: "Actions",
        key: "actions",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <EditButton onClick={() => showModal(record)} />
            <DeleteIcon
              title="Delete flat"
              onConfirm={() => confirm(record.id)}
            />
          </div>
        ),
      },
    ];
  };
