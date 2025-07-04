import { TableProps, Typography } from "antd";
import { IClientPaymentHistory } from "../types/reportTypes";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const ClientPaymentHistoryTableColumns =
  (): TableProps<IClientPaymentHistory>["columns"] => {
    return [
      {
        title: "SL",
        render: (_text, _record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "payment_date",
        key: "payment_date",
        render: (payment_date) => {
          return dayjs(payment_date).format("YYYY-MM-DD");
        },
      },
      {
        title: "Client",
        dataIndex: "client_name",
        key: "client_name",
      },
      {
        title: "Product",
        dataIndex: "product_name",
        key: "product_name",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Payment",
        render: (record) =>
          Number(record.amount) > 0 ? (
            <Typography style={{ color: "red" }}>Due</Typography>
          ) : (
            <Typography style={{ color: "green" }}>All complete</Typography>
          ),
      },
      {
        title: "Method",
        dataIndex: "method",
        key: "method",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => (
          <>
            {Number(amount) !== 0 ? (
              <Typography style={{ color: "red" }}>
                {amount} -{" "}
                <Link to={"/money-receipt/create"}>Money Receipt</Link>
              </Typography>
            ) : (
              0
            )}
          </>
        ),
      },
    ];
  };
