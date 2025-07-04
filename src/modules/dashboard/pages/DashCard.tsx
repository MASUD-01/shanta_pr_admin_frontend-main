import { Row, Col, Card, theme } from "antd";
import {
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  InsertRowBelowOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { globalTheme } from "../../../app/slice/themeSlice";
import { styled } from "styled-components";
import { useAppSelector } from "../../../app/store/store";

const StyledCardList = styled.div`
  width: 100%;
  clear: both;
`;

const StyledCard = styled(Card)`
  &&& {
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    .ant-card-meta-title {
      font-size: 20px;
    }

    .cardHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .box-icon {
      padding: 7px 9px;
      border-radius: 5px;
      &.a {
        background-color: rgb(59, 74, 208);
      }
      &.b {
        background-color: #e7b93a;
      }
      &.c {
        background-color: #c73271;
      }
      &.d {
        background-color: #ed8941;
      }
    }
    .anticon {
      color: white;
      font-size: 22px;
    }

    .stat {
      font-size: 16px;
      color: gray;
      margin-top: 8px;
    }

    .title {
      color: white;
      display: inline-block;
      font-size: 18px;
      padding: 10px 10px 0;
      text-transform: uppercase;
    }

    .value {
      font-size: 28px;
      margin-top: 4px;
      font-weight: 700;
    }

    &.blue {
      border-bottom: 8px solid #3d4cd0;
    }

    &.green {
      border-bottom: 8px solid #e7b93a;
    }

    &.orange {
      border-bottom: 8px solid #c73271;
    }

    &.red {
      border-bottom: 8px solid #ed8941;
    }
  }
`;

const DashCard = () => {
  const themeGlobal = useAppSelector(globalTheme);

  return (
    <div style={{ padding: "25px 0px" }}>
      <StyledCardList>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <StyledCard
              className="blue"
              style={{
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm ? "#e6e9f7" : "",
              }}
            >
              <div className="cardHeader">
                <Meta title="Clients" />

                <div className="box-icon a">
                  <Link to={`/`}>
                    <ShoppingCartOutlined className="anticon" />
                  </Link>
                </div>
              </div>

              <div className="value">1,450</div>
              <div className="stat">
                <b style={{ color: "blue" }}>+6.05%</b> Increase since last
                month
              </div>
            </StyledCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <StyledCard
              className="green"
              style={{
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? "rgb(244 233 193)"
                    : "",
              }}
            >
              <div className="cardHeader">
                <Meta title="Employees" />

                <div className="box-icon b">
                  <Link to={`/`}>
                    <UsergroupAddOutlined className="anticon" />
                  </Link>
                </div>
              </div>

              <div className="value">200</div>
              <div className="stat">
                <b style={{ color: "blue" }}>+11.05%</b> Since last month
              </div>
            </StyledCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <StyledCard
              className="orange"
              style={{
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? "rgb(250 231 248)"
                    : "",
              }}
            >
              <div className="cardHeader">
                <Meta title="Expense " />

                <div className="box-icon c">
                  <Link to={`/`}>
                    <DollarOutlined className="anticon" />
                  </Link>
                </div>
              </div>

              <div className="value">30,5498 BDT</div>
              <div className="stat">
                <b style={{ color: "blue" }}>+9.05%</b> Since last month
              </div>
            </StyledCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <StyledCard
              className="red"
              style={{
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? "rgb(253 230 219)"
                    : "",
              }}
            >
              <div className="cardHeader">
                <Meta title="Reports" />

                <div className="box-icon d">
                  <Link to={`/`}>
                    <InsertRowBelowOutlined className="anticon" />
                  </Link>
                </div>
              </div>

              <div className="value">2,549</div>
              <div className="stat">
                <b style={{ color: "blue" }}>+9.05%</b> Since last month
              </div>
            </StyledCard>
          </Col>
        </Row>
      </StyledCardList>
    </div>
  );
};

export default DashCard;
