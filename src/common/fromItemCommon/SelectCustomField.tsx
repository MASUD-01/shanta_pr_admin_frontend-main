/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Select,
  Typography,
  Upload,
} from 'antd';
import { commonProps } from '../Types/CommonTypes';
import {
  useGetAccountHeadSelectQuery,
  useGetCommonClientCategoryQuery,
  useGetCommonClientQuery,
  useGetCommonExpenseHeadQuery,
  useGetCommonGroupQuery,
  useGetCommonProductQuery,
  useGetCommonSourceQuery,
  useGetCpmmonEmployeesQuery,
} from '../CommonEndPoint/CommonEndPoint';
import dayjs from 'dayjs';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../app/store/store';
import { setCommonModal } from '../../app/slice/modalSlice';
import CreateProduct from '../../modules/Configuration/Products/components/CreateProduct';

export const FormDate = ({
  name,
  label,
  size,
  rules,
  placeholder,
  required,
  disabled,
  format,
  picker,
  onChange,
}: commonProps) => {
  function disabledYear(currentYear: any) {
    // Disable future years (next year and beyond)
    const currentYearInt = currentYear.year();
    const currentYearNow = dayjs().year();
    return currentYearInt > currentYearNow;
  }
  return (
    <Col xs={24} sm={24} md={12} lg={size}>
      <Form.Item required={required} label={label} name={name} rules={rules}>
        <DatePicker
          disabled={disabled || false}
          disabledDate={disabledYear}
          style={{ width: '100%' }}
          format={format}
          picker={picker}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Form.Item>
    </Col>
  );
};

export const FormFileInput = ({
  name,
  label,
  rules,
  required,
  accept,
  picture,
  fileList,
  setFileList,
  maxCount,
  disabled,
  validateStatus,
  help,
}: commonProps) => {
  return (
    <Form.Item
      label={label}
      required={required}
      name={name}
      help={help}
      validateStatus={validateStatus}
      valuePropName='fileList'
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }}
      rules={rules}
    >
      <Upload
        fileList={fileList}
        onChange={({ fileList: newFileList }: { fileList: any }) =>
          setFileList && setFileList(newFileList)
        }
        listType={picture}
        action={''}
        accept={accept ?? 'image/*'}
        beforeUpload={() => false}
        maxCount={maxCount || 1}
      >
        <Button
          style={{ width: '100%' }}
          icon={<UploadOutlined />}
          disabled={disabled || false}
        >
          Click to Upload
        </Button>
      </Upload>
    </Form.Item>
  );
};

export function DateInput({
  name,
  label,
  required,
  year,
  placeholder,
  disabled,
  rangePicker,
  dependencies,
  rules,
  onChange,
}: commonProps) {
  // const today = dayjs();
  const { RangePicker } = DatePicker;
  return (
    <Form.Item
      dependencies={dependencies}
      rules={[
        {
          required: required,
          message: `${label} is required`,
          type: !rangePicker ? 'date' : 'array',
        },
        ...(rules || []),
      ]}
      name={name}
      label={label}
    >
      {!rangePicker ? (
        <DatePicker
          // defaultValue={today}
          picker={year ? 'year' : 'date'}
          format={year ? 'YYYY' : 'DD-MM-YYYY'}
          placeholder={placeholder || 'Select date'}
          style={{ width: '100%' }}
          disabled={disabled}
          onChange={onChange}
        />
      ) : (
        <RangePicker
          style={{ width: '100%' }}
          disabled={disabled}
          picker={year ? 'year' : 'date'}
          format={year ? 'YYYY' : 'DD-MM-YYYY'}
        />
      )}
    </Form.Item>
  );
}

/* Account Head */
export const SelectAccountHead = ({ name, label, required }: commonProps) => {
  const { data: accountHead } = useGetAccountHeadSelectQuery();
  const selectAccount = accountHead?.data;
  const accountChildren: React.ReactNode[] = [];
  if (selectAccount) {
    for (let i = 0; i < selectAccount.length; i++) {
      accountChildren.push(
        <Select.Option
          title='Select Account'
          key={selectAccount[i].id + ' ' + selectAccount[i].name}
          value={selectAccount[i].id}
        >
          {selectAccount[i].name} [{selectAccount[i].code}]
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Parent'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        popupMatchSelectWidth={170}
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
      >
        {accountChildren}
      </Select>
    </Form.Item>
  );
};

/* Account Group */
export const SelectAccountGroup = ({ name, label, required }: commonProps) => {
  const { data: accountGroup } = useGetCommonGroupQuery();
  const selectGroup = accountGroup?.data;
  const accountGroupChildren: React.ReactNode[] = [];
  if (selectGroup) {
    for (let i = 0; i < selectGroup.length; i++) {
      accountGroupChildren.push(
        <Select.Option
          title='Select Group'
          key={selectGroup[i].id + ' ' + selectGroup[i].name}
          value={selectGroup[i].id}
        >
          {selectGroup[i].name} [{selectGroup[i].code}]
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Group'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        popupMatchSelectWidth={170}
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
      >
        {accountGroupChildren}
      </Select>
    </Form.Item>
  );
};

/* Expense Head */
export const SelectExpenseHead = ({ name, label, required }: commonProps) => {
  const { data: expenseHead } = useGetCommonExpenseHeadQuery();
  const selectExpenseHead = expenseHead?.data;
  const expenseHeadChildren: React.ReactNode[] = [];
  if (selectExpenseHead) {
    for (let i = 0; i < selectExpenseHead.length; i++) {
      expenseHeadChildren.push(
        <Select.Option
          title='Select Expense Head'
          key={selectExpenseHead[i].id + ' ' + selectExpenseHead[i].name}
          value={selectExpenseHead[i].id}
        >
          {selectExpenseHead[i].name} [{selectExpenseHead[i].expense_head_id}]
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Expense Head'}
        showSearch
        allowClear
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
      >
        {expenseHeadChildren}
      </Select>
    </Form.Item>
  );
};

/* client category */
export const SelectClientCategory = ({
  name,
  label,
  required,
  disabled,
}: commonProps) => {
  const { data: clientCategory } = useGetCommonClientCategoryQuery();

  const selectClientCategory = clientCategory?.data;
  const clientCategoryChildren: React.ReactNode[] = [];
  if (selectClientCategory) {
    for (let i = 0; i < selectClientCategory.length; i++) {
      clientCategoryChildren.push(
        <Select.Option
          title='Select Client Category'
          key={
            selectClientCategory[i].id +
            ' ' +
            selectClientCategory[i].category_name
          }
          value={selectClientCategory[i].id}
        >
          {selectClientCategory[i].category_name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        disabled={disabled}
        placeholder={'Select Client Category'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
      >
        {clientCategoryChildren}
      </Select>
    </Form.Item>
  );
};

/* SOURCE    */
export const SelectSource = ({ name, label, required }: commonProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { data: source } = useGetCommonSourceQuery(
    searchValue ? { name: searchValue } : {}
  );
  const selectSource = source?.data;
  const handleSearch = (searchValue: string) => {
    debounce(() => {
      setSearchValue(searchValue);
    }, 500)();
  };
  const sourceChildren: React.ReactNode[] = [];

  if (selectSource) {
    for (let i = 0; i < selectSource.length; i++) {
      sourceChildren.push(
        <Select.Option
          title='Select Source'
          key={selectSource[i].id + ' ' + selectSource[i].name}
          value={selectSource[i].id}
        >
          {selectSource[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Source'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
        onSearch={handleSearch}
      >
        {sourceChildren}
      </Select>
    </Form.Item>
  );
};

/* Client    */
export const SelectClient = ({ name, label, required }: commonProps) => {
  const { data: client } = useGetCommonClientQuery();
  const selectClient = client?.data;
  const clientChildren: React.ReactNode[] = [];
  if (selectClient) {
    for (let i = 0; i < selectClient.length; i++) {
      clientChildren.push(
        <Select.Option
          title='Select Client'
          key={selectClient[i].id + ' ' + selectClient[i].name}
          value={selectClient[i].id}
        >
          {selectClient[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Client'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
      >
        {clientChildren}
      </Select>
    </Form.Item>
  );
};

/* product    */
export const SelectProduct = ({
  name,
  label,
  required,
  handleSelect,
  defaultValue,
}: commonProps) => {
  const dispatch = useAppDispatch();
  const showModal2 = () => {
    dispatch(
      setCommonModal({
        title: 'Create Product',
        content: <CreateProduct />,
        show: true,
        width: 600,
      })
    );
  };
  const [searchValue, setSearchValue] = useState('');
  const { data: product } = useGetCommonProductQuery(
    searchValue
      ? {
          name: searchValue,
        }
      : {}
  );
  const debouncesSetSearchValue = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 500),
    []
  );
  const handleSearch = (searchValue: string) => {
    debouncesSetSearchValue(searchValue);
  };

  return (
    <Form.Item
      name={name}
      label={
        label || (
          <>
            Product
            <Button
              type='primary'
              size={'small'}
              icon={<PlusOutlined />}
              onClick={showModal2}
              style={{ marginLeft: '5px' }}
            >
              Add
            </Button>
          </>
        )
      }
      rules={[
        {
          required: required || false,
          message: `${label || 'Product'} is required!`,
        },
      ]}
    >
      <Select
        defaultValue={defaultValue as number}
        placeholder={'Select Product'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option?.label?.toLowerCase() ?? '')?.includes(input?.toLowerCase())
        }
        onSearch={handleSearch}
        onSelect={(e) => handleSelect && handleSelect(e)}
        onChange={(e) => {
          handleSelect && handleSelect(e);
          if (!e) {
            //its works when click cross button
            setSearchValue('');
          }
        }}
        options={
          product?.data?.length
            ? product?.data?.map((product) => ({
                value: product.id,
                label: product.name,
              }))
            : []
        }
      />
    </Form.Item>
  );
};

export const CommonCustomLabelProductSelect = ({
  name,
  label,
  required,
  handleSelect,
  defaultValue,
  customLabel,
  md,
  lg,
  xl,
  margin,
  paddingTopZero,
}: commonProps & {
  name: string | string[];
  required?: boolean;
  label?: boolean;
  md?: number;
  lg?: number;
  xl?: number;
  onSelect?: any;
  margin?: string;
  customLabel?: boolean;
  paddingTopZero?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const showModal2 = () => {
    dispatch(
      setCommonModal({
        title: 'Create Product',
        content: <CreateProduct />,
        show: true,
        width: 600,
      })
    );
  };
  const [searchValue, setSearchValue] = useState('');
  const { data: product } = useGetCommonProductQuery(
    searchValue
      ? {
          name: searchValue,
        }
      : {}
  );
  const handleSearch = useMemo(() => {
    return debounce((searchValue: any) => {
      setSearchValue(searchValue);
    }, 500);
  }, []);

  return (
    <>
      <Col
        xs={24}
        sm={24}
        md={md || 8}
        lg={lg || 8}
        xl={xl || lg}
        style={{ paddingTop: paddingTopZero ? '0px' : '3px' }}
      >
        {customLabel && (
          <div>
            <Typography.Text>Select Product</Typography.Text>
          </div>
        )}

        <Form.Item
          style={{
            marginBottom: margin ? margin : '24px',
          }}
          name={name}
          label={
            label ? (
              <>
                Product
                <Button
                  type='primary'
                  size={'small'}
                  icon={<PlusOutlined />}
                  onClick={showModal2}
                  style={{ marginLeft: '5px' }}
                >
                  Add
                </Button>
              </>
            ) : (
              ''
            )
          }
          rules={[{ required: required, message: 'Client is required' }]}
        >
          <Select
            defaultValue={defaultValue as number}
            placeholder={'Select Product'}
            showSearch
            allowClear
            style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
            optionFilterProp='roleMobile'
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? '')?.includes(
                input?.toLowerCase()
              )
            }
            onSearch={handleSearch}
            onSelect={(e) => handleSelect && handleSelect(e)}
            onChange={(e) => {
              handleSelect && handleSelect(e);
              if (!e) {
                //its works when click cross button
                setSearchValue('');
              }
            }}
            options={
              product?.data?.length
                ? product?.data?.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))
                : []
            }
          />
        </Form.Item>
      </Col>
    </>
  );
};

/* employee    */
export const SelectEmployee = ({
  name,
  label,
  required,
  onSelectEmployee,
}: commonProps) => {
  const { data: emp } = useGetCpmmonEmployeesQuery();
  const selectEmp = emp?.data;
  const empChildren: React.ReactNode[] = [];
  const handleEmployeeSelect = (value: string) => {
    const selectedInvoice = selectEmp?.find(
      (invoice: any) => invoice.id === value
    );
    if (selectedInvoice) {
      onSelectEmployee(selectedInvoice.salary);
    }
  };
  if (selectEmp) {
    for (let i = 0; i < selectEmp.length; i++) {
      empChildren.push(
        <Select.Option
          title='Select Employee'
          key={selectEmp[i].id + ' ' + selectEmp[i].name}
          value={selectEmp[i].id}
        >
          {selectEmp[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={'Select Employee'}
        showSearch
        allowClear
        style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
        optionFilterProp='roleMobile'
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input.toLowerCase())
        }
        onChange={handleEmployeeSelect}
      >
        {empChildren}
      </Select>
    </Form.Item>
  );
};
