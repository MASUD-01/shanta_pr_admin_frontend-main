import { TableProps } from "antd";
import { IInvestment } from "../types/reportTypes";

export const InvestmentReportTableColumns =
  (): TableProps<IInvestment>["columns"] => {
    return [
      {
        title: "SL",
        render: (_text, _record, index) => index + 1,
      },

      {
        title: "Investor",
        dataIndex: "invested_by",
        key: "invested_by",
      },
      {
        title: "Payment Method",
        dataIndex: "payment_method",
        key: "payment_method",
      },
      {
        title: "Bank Name",
        dataIndex: "bank_name",
        key: "bank_name",
      },
      {
        title: "Receiver",
        dataIndex: "receiver",
        key: "receiver",
        width: "300px",
      },
      {
        title: "Purpose",
        dataIndex: "purpose",
        key: "purpose",
        width: "300px",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
    ];
  };
