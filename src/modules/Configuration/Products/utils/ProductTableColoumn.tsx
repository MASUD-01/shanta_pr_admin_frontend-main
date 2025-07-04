/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import { IProduct } from "../types/ProductTypes";
import { DeleteIcon, EditButton } from "../../../../common/icon/Icon";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import UpdateProduct from "../components/UpdateProduct";
import { useDeleteProductMutation } from "../api/productEndPoint";

export const ProductTableColumns = (
  productSub: any
): TableProps<IProduct>["columns"] => {
  const dispatch = useDispatch();
  const [deleteProduct] = useDeleteProductMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteProduct(id);
    }
  };
  const showModal = (data: IProduct) => {
    dispatch(
      setCommonModal({
        title: "Edit Product",
        content: <UpdateProduct data={data} />,
        show: true,
        // width: 1000,
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
      render: (text) => <p>{text || "N/A"}</p>,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text) => <p>{text ? text : "N/A"}</p>,
    },
    {
      title: "Actions",
      width: 100,
      render: (record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* <CommonTooltip title={"View"}>
            <Link to={`${id}`}>
              <Button size="small" type="primary">
                View
              </Button>
            </Link>
          </CommonTooltip> */}

          {productSub?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )}
          {productSub?.permissions?.delete && (
            <DeleteIcon onConfirm={() => confirm(record?.id)} />
          )}
        </div>
      ),
    },
  ];
};
