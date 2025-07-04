import { Row, Col } from "antd";
// import { Doughnut } from "react-chartjs-2";

export const DashboardSource = () => {
  // const data = {
  //   labels: ["Verified Log", "Evaluation"],
  //   datasets: [
  //     {
  //       label: "Percentage(%)",
  //       data: [60, 80],
  //       backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   aspectRatio: 1.5,
  // };

  return (
    <div>
      <div className="dashboard-card-bg">
        <p className="dashboard-card-text ">Top 1 Source</p>
      </div>
      {/* <Doughnut data={data} /> */}
      <Row>
        <Col xs={24} md={12} xxl={12}>
          fafa
        </Col>
        <Col xs={24} md={12} xxl={12}>
          chart
          {/* <Doughnut data={data} options={options} /> */}
        </Col>
      </Row>
    </div>
  );
};
