import { TableProps } from "antd";
import { IExpenseHead } from "../../types/reportTypes";
import dayjs from "dayjs";

export const ExpenseHeadReportTableColumns =
  (): TableProps<IExpenseHead>["columns"] => {
    return [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => {
          return dayjs(date).format("YYYY-MM-DD");
        },
      },
      {
        title: "Expense",
        dataIndex: "expense_head_name",
        key: "expense_head_name",
      },

      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
      },
    ];
  };
