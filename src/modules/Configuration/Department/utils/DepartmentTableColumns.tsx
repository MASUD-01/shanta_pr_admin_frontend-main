/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { IDepartment } from "../types/departmentTypes";
import { DeleteIcon, EditButton } from "../../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import UpdateDepartment from "../components/UpdateDepartment";
import { useDeleteDepartmentMutation } from "../api/departmentEndPoint";

export const DepartmentTableColumns = (
  departmentSub: any
): TableProps<IDepartment>["columns"] => {
  const dispatch = useDispatch();

  const [deleteDepartment] = useDeleteDepartmentMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteDepartment(id);
    }
  };
  const showModal = (record: IDepartment) => {
    dispatch(
      setCommonModal({
        title: "Edit department",
        content: <UpdateDepartment record={record} />,
        show: true,
      })
    );
  };

  return [
    {
      title: "SL",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "70%",
    },
    {
      title: "Action",

      render: (record) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!record?.is_default && (
              <>
                {departmentSub?.permissions?.update && (
                  <EditButton onClick={() => showModal(record)} />
                )}
                {departmentSub?.permissions?.delete && (
                  <DeleteIcon onConfirm={() => confirm(record?.id)} />
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];
};
