import { Card, Col, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "February",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "August",
    uv: 3590,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "September",
    uv: 3890,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "October",
    uv: 4090,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "November",
    uv: 4190,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "December",
    uv: 5090,
    pv: 4300,
    amt: 2100,
  },
];

export default function BarGraph() {
  return (
    <>
      <Row gutter={24}>
        <Col xs={24} lg={18}>
          <Card
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Row justify="start">
              <div style={{ width: "100%" }}>
                <ResponsiveContainer
                  width="100%"
                  height={400}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="uv"
                          stroke="#0891B2"
                          fill="#A5F3FC"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </ResponsiveContainer>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={6} style={{}}>
          <Card style={{ marginTop: "1rem" }}>
            <Row justify="start">
              <div style={{ width: "100%" }}>
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "500",
                  }}
                >
                  Loan Information
                </h3>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                      }}
                    >
                      <h3 style={{ marginBottom: "0.5rem" }}>Bank Name</h3>
                      <p style={{ marginBottom: "0.5rem" }}>Brac Bank</p>
                      <p style={{ marginBottom: "0.5rem" }}>IBBL</p>
                      <p style={{ marginBottom: "0.5rem" }}>NRBC</p>
                      <p style={{ marginBottom: "0.5rem" }}>DBBL</p>
                      <p style={{ marginBottom: "0.5rem" }}>Union Bank</p>
                      <p style={{ marginBottom: "0.5rem" }}>UCB</p>
                      <p style={{ marginBottom: "0.5rem" }}>EBL</p>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        marginTop: "2rem",
                        marginRight: "2rem",
                      }}
                    >
                      <h3 style={{ marginBottom: "0.5rem" }}>Amount</h3>
                      <p
                        style={{
                          marginBottom: "0.5rem",
                          color: "red",
                          fontWeight: "700",
                        }}
                      >
                        201452
                      </p>
                      <p
                        style={{
                          marginBottom: "0.5rem",
                          color: "red",
                          fontWeight: "700",
                        }}
                      >
                        41012{" "}
                      </p>
                      <p style={{ marginBottom: "0.5rem" }}>5421</p>

                      <p style={{ marginBottom: "0.5rem" }}>20147</p>
                      <p style={{ marginBottom: "0.5rem" }}>78412</p>
                      <p style={{ marginBottom: "0.5rem" }}>54444</p>
                      <p style={{ marginBottom: "0.5rem" }}>65210</p>
                    </div>
                  </Col>
                </Row>
                <Link to={"/"}>
                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "2rem",
                      fontSize: "18px",
                    }}
                  >
                    See More
                  </h5>
                </Link>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
