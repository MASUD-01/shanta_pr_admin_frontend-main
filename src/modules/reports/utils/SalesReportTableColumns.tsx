/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from 'antd';
import { ISalesReport } from '../types/reportTypes';
import dayjs from 'dayjs';

export const SalesReportTableColumns =
  (): TableProps<ISalesReport>['columns'] => {
    return [
      {
        title: 'SL',
        render: (_text, _record, index) => index + 1,
      },

      {
        title: 'Invoice No',
        dataIndex: 'invoice_no',
        key: 'invoice_no',
      },
      {
        title: 'Date',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
        render: (invoice_date) => {
          return dayjs(invoice_date).format('DD-MM-YYYY');
        },
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
      },
      {
        title: 'Product',
        dataIndex: 'sale_products',
        key: 'sale_products',
        render: (sale_products) => {
          // Check if `sale_products` exists and is an array
          if (!sale_products?.length) {
            return '-'; // Return a fallback value if no products
          }

          // Generate the product names list with quantities
          const productNamesWithQuantities = sale_products
            .map(
              (product: any) => `${product?.name} (${product?.quantity || 0})`
            )
            .join(', ');

          return productNamesWithQuantities;
        },
      },
      {
        title: 'Sales Amount',
        dataIndex: 'net_total',
        key: 'net_total',
      },
      // {
      //   title: "Discount",
      //   dataIndex: "discount",
      //   key: "discount",
      // },
      // {
      //   title: "Service Charge",
      //   dataIndex: "extra_charge",
      //   key: "extra_charge",
      //   // render: () => 0,
      // },
      {
        title: 'Total Amount',
        // dataIndex: "net_total",
        // key: "net_total",
        render: (_text, _record) => {
          const netTotal = parseFloat(_record.net_total) || 0;
          const extraCharge = parseFloat(_record.extra_charge) || 0;
          return netTotal + extraCharge;
        },
      },
      {
        title: 'Collected Amount',
        dataIndex: 'collection',
        key: 'collection',
      },
      {
        title: 'Due Amount',
        dataIndex: 'due',
        key: 'due',
        render: (text) => <span style={{ color: 'red' }}>{text}</span>,
      },
      {
        title: 'Employee',
        dataIndex: 'sale_by',
        key: 'sale_by',
      },
    ];
  };
