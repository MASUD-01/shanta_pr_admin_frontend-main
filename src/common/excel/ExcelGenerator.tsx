import { useState } from "react";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { Tooltip } from "antd";
import GlobalLoader from "../../app/utils/GlobalLoader";
import { ExportOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../submitButton/CommonButton";
type IProps = {
  excelName: string;
  excelTableHead: string[];
  excelData: any[];
  nameOfBtn?: string;
};
const ExcelGenerator = ({
  excelName,
  excelTableHead,
  excelData,
  nameOfBtn,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    setLoading(true);
    try {
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(`${excelName}`);
      const titleRow = worksheet.addRow(excelTableHead);
      titleRow.eachCell((cell: any) => {
        cell.font = { bold: true };
      });
      titleRow.eachCell((cell: any) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center" };
      });

      // Set column widths
      worksheet.columns.forEach((column: any) => {
        column.width = 25; // Set column width to 30 units
      });
      // Populate data rows
      excelData.forEach((rowData: any) => {
        const values = excelTableHead.map((header: any) => rowData[header]);
        const row = worksheet.addRow(values);

        // Set row height
        row.height = 25; // Set row height to 25 units

        // Apply cell formatting
        row.eachCell((cell: any) => {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        });
      });

      const excelDataGenerate = await workbook.xlsx.writeBuffer();
      // download the processed file
      saveAs(new Blob([excelDataGenerate]), `${excelName}.xlsx`);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Something Went Wrong", error.message);
    }
  };
  return (
    <div>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Tooltip placement="topRight" title={"Download excel report"}>
          <PrimaryButton
            name={nameOfBtn || "Export Excel"}
            // name="Export Excel"
            onClick={() => {
              if (excelData?.length) saveExcel();
            }}
            icon={<ExportOutlined />}
          />
          {/* <Button type="primary">Export Excel</Button> */}
        </Tooltip>
      )}
    </div>
  );
};

export default ExcelGenerator;
