/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCommonModal } from '../../../../app/slice/modalSlice';
import { useDispatch } from 'react-redux';
import UpdateEmployee from '../components/UpdateEmployee';
import { Button, Card, Descriptions, Tag } from 'antd';
import CommonTooltip from '../../../../common/tooltip/CommonTooltip';
import { useParams } from 'react-router-dom';
import { useGetSingleEmployeeQuery } from '../api/employeeEndPoint';
import GlobalLoader from '../../../../app/utils/GlobalLoader';
import { ISingleEmployee } from '../types/employeeTypes';
import { DescriptionsProps } from 'antd/lib';
import dayjs from 'dayjs';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';

const SingleEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleEmployeeQuery(Number(id));

  const singleEmployee = data?.data as ISingleEmployee;
  const dispatch = useDispatch();

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const configList = profileInfo?.find(
    (i: any) => i?.module_name === 'Configuration'
  );

  const employeeSub = configList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Employee'
  );

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Update Employee',
        content: (
          <UpdateEmployee employee={singleEmployee} key={singleEmployee.id} />
        ),
        show: true,
        width: 1000,
      })
    );
  };
  const items: DescriptionsProps['items'] = [
    {
      key: '12',
      label: 'name',
      children: singleEmployee?.name,
    },
    {
      key: '1',
      label: 'Designation',
      children: singleEmployee?.designation,
    },
    {
      key: '2',
      label: 'Department Name',
      children: singleEmployee?.department,
    },
    {
      key: '11',
      label: 'Status',
      children: (
        <Tag color={singleEmployee?.status ? 'green' : 'red'}>
          {singleEmployee?.status ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      key: '3',
      label: 'Mobile No',
      children: singleEmployee?.mobile,
    },
    {
      key: '4',
      label: 'Email',
      children: singleEmployee?.email,
    },
    {
      key: '5',
      label: 'Salary',
      children: singleEmployee?.salary,
    },
    {
      key: '6',
      label: 'Commission',
      children: singleEmployee?.commission,
    },
    {
      key: '7',
      label: 'Appointment Date',
      children: dayjs(singleEmployee?.appointment_date).format('DD-MM-YYYY'),
    },
    {
      key: '8',
      label: 'Joining Date',
      children: dayjs(singleEmployee?.joining_date).format('DD-MM-YYYY'),
    },
    {
      key: '9',
      label: 'Date of Birth',
      children: singleEmployee?.date_of_birth
        ? dayjs(singleEmployee.date_of_birth).format('DD-MM-YYYY')
        : 'N/A',
    },
    {
      key: '9',
      label: 'Blood Group',
      children: singleEmployee?.blood_group,
    },

    {
      key: '10',
      label: 'Address',
      children: singleEmployee?.address,
    },

    {
      key: '12',
      label: 'Created By',
      children: singleEmployee?.created_by,
    },
  ];
  return (
    <div>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <Card
          title={`Details of ${singleEmployee?.name}`}
          extra={
            employeeSub?.permissions?.update && (
              <CommonTooltip title={'Edit'}>
                <Button
                  size='small'
                  type='primary'
                  onClick={() => {
                    showModal();
                  }}
                >
                  Edit
                </Button>
              </CommonTooltip>
            )
          }
        >
          <Descriptions bordered items={items} />
        </Card>
      )}
    </div>
  );
};

export default SingleEmployee;
