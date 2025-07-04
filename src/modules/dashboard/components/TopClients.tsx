/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Typography } from "antd";
import { IDashboardData } from "../types/dashboardTypes";
// import ReactApexChart from "react-apexcharts";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const TopClients = ({ data }: { data: IDashboardData }) => {
  // const seriesData = data?.topClients
  //   ?.slice(0, 5)
  //   .map((item) => Number(item.sale_amount));

  // const chartOptions: any = {
  //   chart: {
  //     type: "donut",
  //   },
  //   labels: data?.topClients
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
          //   background: "linear-gradient(30deg, #239ed8, #1c79be)",
          background: "#337ab7",

          padding: "5px 20px",
          borderRadius: 4,
        }}
      >
        <Typography.Text
          strong
          style={{ fontSize: "16px", color: "#fff", fontWeight: "bold" }}
        >
          Top Clients ( This month )
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
            dataKey="sale_amount"
            startAngle={360}
            endAngle={0}
            data={data?.topClients}
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

export default TopClients;
