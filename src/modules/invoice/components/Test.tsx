// import { Card, Col, Descriptions, Divider, Form, Input, Row } from 'antd';
// import dayjs from 'dayjs';
// import { useEffect, useMemo } from 'react';
// import SubmitButton from '../../../common/submitButton/SubmitButton';
// import Container from '../../../common/Container/Container';
// import CreateProject from '../../CreateProject/CreateProject';
// import PricingCoastDynamicForm from './PricingCoastDynamicForm';
// import { DateInput } from '../../../common/fromItemCommon/SelectCustomField';
// import SelectCostingName from '../../Configuration/DefineCostListName/components/SelectCostingName';

// const CreatePurchaseForm = () => {
//   const [form] = Form.useForm();

//   /* Form calculation */
//   const productItem = Form.useWatch(['pricingandcost'], form);
//   const wholeSubTotal = useMemo(() => {
//     return (
//       (productItem || []).reduce(
//         (acc: any, curr: any) => acc + curr?.product_actual_total,
//         0
//       ) || 0
//     );
//   }, [productItem]);
//   const wholeVatTotal = useMemo(() => {
//     return (productItem || [])?.reduce((acc: number, curr: any) => {
//       if (curr?.vat_type === 'fixed') {
//         return acc + (curr?.vat || 0);
//       } else if (curr?.vat_type === 'percentage') {
//         const vat =
//           ((curr?.product_actual_total || 0) * (curr?.vat || 0)) / 100;
//         return acc + vat;
//       }
//       return acc;
//     }, 0);
//   }, [productItem]);

//   const netTotal = useMemo(() => {
//     return (
//       (productItem || []).reduce(
//         (acc: any, curr: any) => acc + curr?.product_total,
//         0
//       ) || 0
//     );
//   }, [productItem]);

//   const grossTotal = netTotal;

//   useEffect(() => {
//     if (grossTotal) {
//       form.validateFields();
//     }
//   }, [form, grossTotal]);

//   const onFinish = async (values: Record<string, any>) => {
//     console.log(values, '--------------');
//     values.date = dayjs(values?.date).format('YYYY-MM-DD');
//   };
//   return (
//     <Container>
//       <Card styles={{ body: { paddingTop: 0 } }}>
//         <Form layout='vertical' form={form} onFinish={onFinish}>
//           <Card
//             size='small'
//             className='border'
//             style={{ marginBottom: '1rem', marginTop: '1rem' }}
//             //   styles={{ body: { padding: 0 } }}
//           >
//             <Row gutter={[12, 12]}>
//               <Divider style={{ margin: 0, fontWeight: 'bold' }}>
//                 New Pricing & Cost sheet Info
//               </Divider>
//               <Col xs={24}>
//                 <Row gutter={[10, 0]}>
//                   <Col xs={24} sm={24} md={6} lg={6}>
//                     <CreateProject />
//                   </Col>
//                   <Col xs={24} sm={24} md={6} lg={6}>
//                     <Form.Item
//                       name='cost_sheet_name'
//                       rules={[{ required: true }]}
//                       label='Cost Sheet Name'
//                     >
//                       <Input placeholder='Cost Sheet Name' type='text' />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={24} md={6} lg={6}>
//                     <DateInput
//                       label='Select Date'
//                       name='invoice_date'
//                       size={5}
//                       // defaultValue={dayjs()}
//                     />
//                   </Col>
//                 </Row>
//               </Col>

//               <Col xs={24} sm={24} md={24} lg={24}>
//                 <Form.List name='pricingandcost' initialValue={[{}]}>
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map((field, index, arr) => {
//                         return (
//                           <>
//                             <PricingCoastDynamicForm
//                               index={index}
//                               arr={arr?.length}
//                               add={add}
//                               remove={remove}
//                               field={field}
//                               form={form}
//                               wholeVatTotal={wholeVatTotal}
//                             />
//                           </>
//                         );
//                       })}
//                     </>
//                   )}
//                 </Form.List>
//               </Col>

//               <Col xs={24} sm={24} md={24} lg={10}>
//                 <Card>
//                   <Descriptions
//                     column={1}
//                     size='small'
//                     bordered
//                     items={[
//                       {
//                         key: '1',
//                         label: 'Sub Total',
//                         children: wholeSubTotal,
//                       },

//                       {
//                         key: '3',
//                         label: 'Net Total',
//                         children: netTotal,
//                         style: { fontWeight: 'bold' },
//                       },

//                       {
//                         key: '5',
//                         label: 'Vat (+)',
//                         children: wholeVatTotal,
//                       },

//                       {
//                         key: '8',
//                         label: 'Gross Total',
//                         children: grossTotal?.toFixed(2),
//                         style: { fontWeight: 'bold' },
//                       },
//                     ]}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//           <SubmitButton label='Submit' htmlType='submit' />
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default CreatePurchaseForm;
// //

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
// import { Button, Col, Row, Form, InputNumber, Radio } from 'antd';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { FormInstance } from 'antd/lib';
// import SelectFieldForAllsServices from '../../Configuration/CreateService/components/SelectFieldForAllsServices';

// type props = {
//   field: any;
//   add: any;
//   remove: any;
//   form: FormInstance<any>;
//   arr: number;
//   index: number;
//   wholeVatTotal: any;
// };

// const PricingCoastDynamicForm = ({
//   field,
//   add,
//   remove,
//   form,
//   arr,
//   index,
//   wholeVatTotal,
// }: props) => {
//   const serviceValue = Form.useWatch(
//     ['pricingandcost', field.name, 'service'],
//     form
//   );
//   const priceValue = Form.useWatch(
//     ['pricingandcost', field.name, 'unit_price'],
//     form
//   );
//   const quantityValue = Form.useWatch(
//     ['pricingandcost', field.name, 'quantity'],
//     form
//   );

//   useEffect(() => {
//     if (serviceValue) {
//       form?.setFieldValue(
//         ['pricingandcost', field.name, 'unit_price'],
//         Number(serviceValue)
//       );
//     }
//   }, [serviceValue]);

//   const subTotal = quantityValue
//     ? Number(priceValue) * Number(quantityValue)
//     : Number(priceValue);
//   useEffect(() => {
//     if (priceValue || quantityValue) {
//       form?.setFieldValue(
//         ['pricingandcost', field.name, 'product_actual_total'],
//         subTotal
//       );

//       form?.setFieldValue(
//         ['pricingandcost', field.name, 'product_total'],
//         Number(priceValue) + Number(wholeVatTotal || 0)
//       );
//     } else {
//       form?.setFieldValue(
//         ['pricingandcost', field.name, 'product_actual_total'],
//         undefined
//       );
//     }

//     if (wholeVatTotal || priceValue || quantityValue) {
//       form?.setFieldValue(
//         ['pricingandcost', field.name, 'product_total'],
//         subTotal + Number(wholeVatTotal || 0)
//       );
//     } else {
//       if (!wholeVatTotal && !priceValue) {
//         form?.setFieldValue(
//           ['pricingandcost', field.name, 'product_total'],
//           undefined
//         );
//       }
//     }
//   }, [priceValue, wholeVatTotal, quantityValue]);

//   return (
//     <>
//       <Row gutter={16} align={'middle'}>
//         <SelectFieldForAllsServices
//           name={[field.name, 'service']}
//           plainLabel
//           required
//           md={12}
//           lg={3}
//         />

//         <Col xs={24} sm={24} md={12} lg={3}>
//           <Form.Item
//             name={[field.name, 'unit_price']}
//             label='Price'
//             rules={[
//               {
//                 required: true,
//               },
//             ]}

//             // initialValue={0}
//           >
//             <InputNumber
//               placeholder='Price'
//               style={{
//                 width: '100%',
//               }}
//               type='number'
//               min={0}
//             />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={12} lg={3}>
//           <Form.Item name={[field.name, 'quantity']} label='Quantity'>
//             <InputNumber
//               placeholder='Quantity'
//               style={{
//                 width: '100%',
//               }}
//               type='number'
//               min={0}
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} sm={24} md={24} lg={3}>
//           <Form.Item
//             name={[field.name, 'vat_type']}
//             label='Vat Type'
//             initialValue={'fixed'}
//           >
//             <Radio.Group
//               style={{
//                 width: '100%',
//               }}
//               buttonStyle='solid'
//             >
//               <Radio.Button
//                 style={{
//                   width: '50%',
//                 }}
//                 value='fixed'
//               >
//                 Tk
//               </Radio.Button>
//               <Radio.Button
//                 style={{
//                   width: '50%',
//                 }}
//                 value='percentage'
//               >
//                 %
//               </Radio.Button>
//             </Radio.Group>
//           </Form.Item>
//         </Col>

//         <Col xs={24} sm={24} md={12} lg={3}>
//           <Form.Item name={[field.name, 'vat']} label='Vat' initialValue={0}>
//             <InputNumber
//               placeholder='Enter vat'
//               style={{
//                 width: '100%',
//               }}
//               type='number'
//               min={0}
//             />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={12} lg={3}>
//           <Form.Item
//             name={[field.name, 'product_actual_total']}
//             label='Sub Total'
//             initialValue={0}
//           >
//             <InputNumber
//               readOnly
//               placeholder='Sub Total'
//               style={{
//                 width: '100%',
//               }}
//               type='number'
//               min={0}
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} sm={24} md={12} lg={3}>
//           <Form.Item
//             name={[field.name, 'product_total']}
//             label='Net Total'
//             initialValue={0}
//           >
//             <InputNumber
//               readOnly
//               placeholder='Net Total'
//               style={{
//                 width: '100%',
//               }}
//               type='number'
//               min={0}
//             />
//           </Form.Item>
//         </Col>

//         {index === arr - 1 ? (
//           <Col xs={24} sm={24} md={12} lg={1}>
//             <Button
//               type='dashed'
//               style={{
//                 marginTop: '6px',
//               }}
//               onClick={() => {
//                 if (arr >= 15) {
//                   // message.error("You can't add more than 15 products");
//                 } else {
//                   add();
//                 }
//               }}
//               block
//               icon={<PlusOutlined />}
//             ></Button>
//           </Col>
//         ) : (
//           <Col xs={24} sm={24} md={12} lg={1}>
//             <Button
//               type='dashed'
//               style={{
//                 marginTop: '6px',
//               }}
//               onClick={() => remove(index)}
//               block
//               icon={
//                 <MinusCircleOutlined
//                   style={{
//                     color: 'red',
//                   }}
//                 />
//               }
//             ></Button>
//           </Col>
//         )}
//       </Row>
//     </>
//   );
// };

// export default PricingCoastDynamicForm;
