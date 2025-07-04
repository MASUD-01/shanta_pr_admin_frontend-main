/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from 'antd';

import { DeleteIcon, EditButton } from '../../../../common/icon/Icon';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import { useDeleteDesignationMutation } from '../api/DesignationEndPoints';
import { IAllDesignation } from '../types/DesignationTypes';
import UpdateDesignation from '../components/UpdateDesignation';

export const DesignationTableColumns = (
  designationSub: any
): TableProps<IAllDesignation>['columns'] => {
  const dispatch = useDispatch();
  const [deleteDesignation] = useDeleteDesignationMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteDesignation(id);
    }
  };
  const showModal = (record: IAllDesignation) => {
    dispatch(
      setCommonModal({
        title: 'Edit Designation',
        content: <UpdateDesignation record={record} />,
        show: true,
      })
    );
  };

  return [
    {
      title: 'SL',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },
    {
      title: 'Actions',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!record?.is_default && (
            <>
              {designationSub?.permissions?.update && (
                <EditButton onClick={() => showModal(record)} />
              )}
              {designationSub?.permissions?.delete && (
                <DeleteIcon
                  title='Delete source'
                  onConfirm={() => confirm(record.id)}
                />
              )}
            </>
          )}
        </div>
      ),
    },
  ];
};
