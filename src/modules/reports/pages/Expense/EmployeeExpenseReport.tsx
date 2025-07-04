import { Card, Col, Row } from "antd";

import { useGetEmployeesQuery } from "../../../Configuration/Employee/api/employeeEndPoint";
import { SearchAbleSelectInput } from "../../../../common/Input/SearchAbleSelectInput";
import { PrimaryButton } from "../../../../common/submitButton/CommonButton";
import { PrinterOutlined } from "@ant-design/icons";
import ExcelGenerator from "../../../../common/excel/ExcelGenerator";

const EmployeeExpenseReport = () => {
  const { data: employees } = useGetEmployeesQuery({});

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Row gutter={[5, 5]} justify={"end"}>
          <Col xs={24} md={5} lg={4}>
            <SearchAbleSelectInput
              name={"employee_id"}
              options={
                employees?.data?.length
                  ? employees?.data?.map((employee) => ({
                      value: employee.id,
                      label: employee.name,
                    }))
                  : []
              }
              placeholder="Select employee"
            />
          </Col>

          <Col xs={24} sm={24} md={2} lg={2}>
            <PrimaryButton
              name="Print"
              //   onClick={handlePrint}
              icon={<PrinterOutlined />}
            />
          </Col>
          <Col xs={24} sm={24} md={3} lg={3} xxl={2}>
            <ExcelGenerator
              excelName="total_due_advance_clients"
              excelTableHead={[
                "SL",
                "Client Name",
                "Mobile No",
                "Email",
                "Present Due",
                "Present Advance",
              ]}
              excelData={
                employees?.data?.length
                  ? employees?.data?.map((sData: any, index) => {
                      const data = {
                        SL: index + 1,
                        "Client Name": sData?.name,
                        "Mobile No": sData?.mobile,
                        Email: sData?.email,
                        "Present Due": sData?.due,
                        "Present Advance": 0,
                      };
                      return data;
                    })
                  : []
              }
            />
          </Col>
        </Row>
      </div>

      <Card
        title={`Employee Expense Report`}
        style={{
          border: "none",
        }}
        // extra={<> </>}
      ></Card>
    </>
  );
};

export default EmployeeExpenseReport;
