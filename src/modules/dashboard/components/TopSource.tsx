/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Row, Typography } from "antd";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

// interface IDashboardData {
//   topSources: {
//     id: number;
//     name: string;
//     total_client: string;
//   }[];
// }

// interface TopSourceProps {
//   data: IDashboardData;
// }

const TopSource: React.FC<any> = ({ data }: any) => {
  const formattedData = data?.topSources?.map((item: any) => ({
    ...item,
    total_client: Number(item.total_client),
  }));

  // console.log(formattedData?.map((item) => item));

  // const seriesData = formattedData
  //   ?.slice(0, 5)
  //   .map((item) => Number(item.total_client));

  // const chartOptions: any = {
  //   chart: {
  //     type: "donut",
  //   },
  //   labels: formattedData
  //     ?.slice(0, 5)
  //     .map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1)),
  //   plotOptions: {
  //     pie: {
  //       dataLabels: {
  //         placement: "left",
  //       },
  //     },
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           width: 200,
  //         },
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="dashboard-box-shape" style={{ height: 350 }}>
      <Row
        justify={"space-between"}
        style={{
          marginBottom: 10,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          background: "#337ab7",
          padding: "5px 20px",
          borderRadius: 4,
        }}
      >
        <Typography.Text
          strong
          style={{ fontSize: "16px", color: "#fff", fontWeight: "bold" }}
        >
          Top Sources
        </Typography.Text>

        {/* {link && (
          <Link to={link}>
            <span style={{ fontSize: 14, fontFamily: "unset", color: "#fff" }}>
              Show All
            </span>
          </Link>
        )} */}
      </Row>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="total_client"
            startAngle={360}
            endAngle={0}
            data={formattedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <>
        {/* <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="donut"
          height={250}
        /> */}
      </>
    </div>
  );
};

export default TopSource;
