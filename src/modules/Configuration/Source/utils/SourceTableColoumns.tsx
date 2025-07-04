import { TableProps } from 'antd';
import { IAllSource } from '../types/SourceTypes';
import { DeleteIcon, EditButton } from '../../../../common/icon/Icon';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';

import UpdateSource from '../components/UpdateSource';
import { useDeleteSourceMutation } from '../api/sourceEndPoint';

export const SourceTableColumns = (
  sourceSub: any
): TableProps<IAllSource>['columns'] => {
  const dispatch = useDispatch();
  const [deleteSource] = useDeleteSourceMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteSource(id);
    }
  };
  const showModal = (record: IAllSource) => {
    dispatch(
      setCommonModal({
        title: 'Edit Source',
        content: <UpdateSource record={record} />,
        show: true,
      })
    );
  };

  return [
    {
      title: 'Sl',
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
              {sourceSub?.permissions?.update && (
                <EditButton onClick={() => showModal(record)} />
              )}
              {sourceSub?.permissions?.delete && (
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
