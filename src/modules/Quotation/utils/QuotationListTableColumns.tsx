/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableProps } from 'antd';
import dayjs from 'dayjs';
import { DeleteIcon, EyeIcon } from '../../../common/icon/Icon';
import { CustomLink } from '../../../common/CustomLink';
import { IQuotation } from '../types/quotationTypes';
// import { useDispatch } from "react-redux";
import { useDeleteQuotationMutation } from '../api/quotationEndPoint';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
// import { setCommonModal } from "../../../app/slice/modalSlice";
// import UpdateQuotation from "../components/UpdateQuotation";

export const QuotationListTableColumns =
  (): TableProps<IQuotation>['columns'] => {
    // const dispatch = useDispatch();

    const { data: profile } = useGetMeQuery();
    const profileInfo = profile?.data?.permissions?.modules;

    const quotation = profileInfo?.find(
      (i: any) => i?.module_name === 'Quotation'
    ) as any;
    const [deleteQuotation] = useDeleteQuotationMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteQuotation(id);
      }
    };

    // const showModal = (record: IQuotation) => {
    //   dispatch(
    //     setCommonModal({
    //       title: "Edit quotation",
    //       content: <UpdateQuotation quotationID={record.id} />,
    //       show: true,
    //       width: 1000,
    //     })
    //   );
    // };

    return [
      {
        title: 'SL',
        dataIndex: 'id',
        key: 'id',
        width: 20,
        render: (___, _, __) => __ + 1,
      },
      {
        title: 'Quotation Date',
        dataIndex: 'quotation_date',
        key: 'quotation_date',
        width: 130,
        render: (quotation_date) => {
          return dayjs(quotation_date).format('DD-MM-YYYY');
        },
      },
      {
        title: 'Quotation No',
        dataIndex: 'quotation_no',
        key: 'quotation_no',
        width: 130,
      },

      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 300,
        render: (text, record) =>
          text ? `${text} [${record?.client_id}]` : 'N/A',
      },

      {
        title: 'Mobile',
        dataIndex: 'client_mobile',
        key: 'client_mobile',
        width: 130,
      },
      {
        title: 'Net Total',
        dataIndex: 'net_total',
        key: 'net_total',
        width: 130,
      },

      {
        title: 'Action',
        width: 130,
        render: (record) => (
          <Space size='middle'>
            <CustomLink to={`/quotation/list/${record.id}`}>
              <EyeIcon />
            </CustomLink>
            {/* <EditButton onClick={() => showModal(record)} /> */}

            {quotation?.sub_modules[1]?.permissions?.delete && (
              <DeleteIcon
                title='Delete Quotation'
                onConfirm={() => confirm(record.id)}
              />
            )}
          </Space>
        ),
      },
    ];
  };
