import { TableProps } from "antd";
import { ILoanType } from "../types/reportTypes";
import dayjs from "dayjs";

export const LoanReportTableColumns = (): TableProps<ILoanType>["columns"] => {
  return [
    {
      title: "SL",
      render: (_text, _record, index) => index + 1,
    },

    {
      title: "Loan From",
      dataIndex: "loan_from",
      key: "loan_from",
    },
    {
      title: "Loan Amount",
      dataIndex: "loan_amount",
      key: "loan_amount",
    },
    {
      title: "Installment Date",
      dataIndex: "installment_date",
      key: "installment_date",
      render: (date) => <p>{dayjs(date).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Installment Amount",
      dataIndex: "installment_amount",
      key: "installment_amount",
      width: "300px",
    },
    {
      title: "Remaining Due",
      dataIndex: "remaining_due",
      key: "remaining_due",
      width: "300px",
    },
  ];
};
