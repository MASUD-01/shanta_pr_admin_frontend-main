import React from "react";
import { Form, FormInstance, FormItemProps, Select, Typography } from "antd";
import { SelectProps } from "antd/lib";

const { Title } = Typography;
const { Option } = Select;

const members = [
	{ id: 1, name: "Mr. Karim" },
	{ id: 2, name: "Mr. Rahim" },
	{ id: 3, name: "Mr. Ali" },
	{ id: 4, name: "Mr. Hossain" },
];

const allIds = members.map((m) => m.id);
type IProps = {
	formItemProps?: FormItemProps;
	selectFieldProps?: SelectProps;
	form?: FormInstance<any>;
};
const OwnerMultiSelect = ({
	form,
	formItemProps,
	selectFieldProps,
}: IProps) => {
	const handleOwnerChange = (value: (number | "all")[]) => {
    if(selectFieldProps?.mode==='multiple'){
      if (value.includes("all") && form) {
			form.setFieldsValue({ owners: allIds });
		} else {
			form?.setFieldsValue({ owners: value });
		}
    }
		
	};

	return (
		<Form.Item label='Select Owner' required {...formItemProps}  rules={[{
			required:true
		}]}>
			<Select
				
				placeholder="Select owner(s)"
				onChange={handleOwnerChange}
				allowClear
				style={{ width: "100%" }}
				{...selectFieldProps}
			>
				{selectFieldProps?.mode === "multiple" && (
					<Option key="all" value="all">
						All Owners
					</Option>
				)}

				{members.map((member) => (
					<Option key={member.id} value={member.id}>
						{member.name}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default OwnerMultiSelect;
