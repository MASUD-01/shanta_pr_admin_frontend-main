/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "antd";
import dayjs from "dayjs";

export const CollectionReportTableColumns = (): TableProps<any>["columns"] => {
	return [
		{
			title: "SL",
			width: 20,
			render: (_text, _record, index) => index + 1,
		},

		{
			title: "Date",
			dataIndex: "invoice_date",
			key: "invoice_date",
			render: (_, record) => {
				return record?.date
					? dayjs(record?.date).format("DD-MMM-YYYY")
					: "";
			},
			width: 150,
		},
		{
			title: "Money Receipt No",
			dataIndex: "money_receipt_no",
			key: "money_receipt_no",
			width: 150,
		},
		{
			title: "Owner",
			dataIndex: "owner",
			key: "owner",
		},

		{
			title: "Payment Method",
			dataIndex: "paymentMethod",
			key: "paymentMethod",
		},
		{
			title: "Bank Account",
			dataIndex: "bankAccount",
			key: "bankAccount",
		},

		{
			title: "Amount (৳)",
			dataIndex: "amount",
			key: "amount",
		},
	];
};
