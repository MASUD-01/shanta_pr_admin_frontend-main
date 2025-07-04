/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableProps } from 'antd';
import { DeleteIcon, EyeIcon } from '../../../common/icon/Icon';
import { useDeleteInvoiceMutation } from '../api/invoiceEndpoints';
import { CustomLink } from '../../../common/CustomLink';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';

export const CostSheetListTableColumns = (): TableProps<any>['columns'] => {
  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules as any;
  const invoice = profileInfo?.find((i: any) => i?.module_name === 'Invoice');

  const [deleteInvoice] = useDeleteInvoiceMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteInvoice(id);
    }
  };

  return [
    {
      title: 'SL',
      width: 20,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Building Name',
      dataIndex: 'building_name',
      key: 'building_name',
    },
    // {
    //   title: 'Cost sheet Name',
    //   dataIndex: 'costsheetname',
    //   key: 'costsheetname',
    // },

    {
      title: 'Actions',
      width: 120,
      render: (record) => (
        <Space size='middle'>
          <CustomLink to={`/pricing&costsheet/list/${1}`}>
            <EyeIcon />
          </CustomLink>
          {/* {invoice?.sub_modules[0]?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )} */}

          {invoice?.sub_modules[1]?.permissions?.delete && (
            <DeleteIcon
              title='Delete Invoice'
              onConfirm={() => confirm(record.id)}
            />
          )}
        </Space>
      ),
    },
  ];
};
