/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Input, Row, Table, theme, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useGetAllAccountQuery } from "../api/AccountEndPoints";
import CreateAccount from "../components/CreateAccount";
import { useEffect, useState } from "react";
import { CreateButton } from "../../../common/submitButton/CommonButton";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { generatePagination } from "../../../common/TablePagination";
import { globalTheme } from "../../../app/slice/themeSlice";
import AccountListColumn from "./ClientBillAdjustment/utils/AccountListColumn";

const Accountlist = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    pageSize: "100",
  });
  const dispatch = useDispatch();
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });

  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "100";
  const skipValue = (Number(page) - 1) * Number(pageSize);

  const [filter, setFilter] = useState<any>({
    limit: Number(pageSize),
    skip: skipValue,
  });

  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const [searchValue, setSearchValue] = useState("");

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const account = profileInfo?.find((i: any) => i?.module_name === "Accounts");

  const accountSub = account?.sub_modules?.find(
    (i: any) => i?.sub_module_name === "LIst/Create Accounts"
  );

  const { data, isFetching, isLoading } = useGetAllAccountQuery({ ...filter });

  useEffect(() => {
    const onSearchDebounced = debounce(() => {
      if (searchValue.trim() !== "") {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          account_name: searchValue,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          account_name: undefined,
        }));
      }
    }, 500);
    onSearchDebounced();
    return () => {
      onSearchDebounced.cancel();
    };
  }, [searchValue, skipValue]);

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Account",
        content: <CreateAccount />,
        show: true,
      })
    );
  };

  return (
    <>
      <Card>
        <div
          className={
            themeGlobal.theme === theme.defaultAlgorithm
              ? "custom-header"
              : "header-dark"
          }
          style={{
            backgroundColor: "#C3E6CB",
            padding: "10px 4px 4px  4px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              {`Account List (${data?.total || 0})`}
            </Typography.Title>
            {accountSub?.permissions.write && (
              <Col xs={12} sm={6} md={8} lg={4} xl={4} xxl={2}>
                <CreateButton name="Add New" onClick={showModal} />
              </Col>
            )}
          </Row>
          <Row
            gutter={[5, 5]}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px",
            }}
          >
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
              <Input
                placeholder="Search by account name"
                onChange={(e) =>
                  e.target.value
                    ? setSearchValue(e.target.value)
                    : setSearchValue("")
                }
              />
            </Col>
          </Row>
        </div>

        <div
          className={
            themeGlobal.theme === theme.defaultAlgorithm ? "custom-table" : ""
          }
          style={{ marginTop: "25px" }}
        >
          <Table
            size="small"
            bordered
            rowKey={"id"}
            dataSource={data?.data?.length ? data?.data : []}
            columns={AccountListColumn()}
            scroll={{ x: true }}
            loading={isLoading || isFetching}
            pagination={{
              ...generatePagination(
                Number(data?.total),
                setPagination,
                pagination
              ),
              current: Number(page),
              showSizeChanger: true,
              defaultPageSize: pageSize ? Number(pageSize) : 100,
              pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
              total: data ? Number(data?.total) : 0,
              showTotal: (total) => `Total ${total} `,
            }}
            onChange={(pagination) => {
              setSearchParams({
                page: String(pagination.current),
                pageSize: String(pagination.pageSize),
              });
              setFilter({
                ...filter,
                skip:
                  ((pagination.current || 1) - 1) *
                  (pagination.pageSize || 100),
                limit: pagination.pageSize!,
              });
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default Accountlist;
