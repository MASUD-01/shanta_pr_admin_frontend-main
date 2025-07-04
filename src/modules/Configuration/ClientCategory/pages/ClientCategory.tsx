/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Table, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useGetClientCategoryQuery } from "../api/ClientCategoryEndPoint";
import { ClientCategoryTableColumns } from "../utils/ClientCategoryTableUtils";
import CreateClientCategory from "../components/CreateClientCategory";
import { useSearchParams } from "react-router-dom";
import { IClientCategoryParams } from "../types/ClientCategoryTypes";
import { useState } from "react";
import { tablePagination } from "../../../../common/TablePagination";
import { PrimaryButton } from "../../../../common/submitButton/CommonButton";
import { useGetMeQuery } from "../../../../app/api/userApi/userApi";
import { globalTheme } from "../../../../app/slice/themeSlice";

const ClientCategory = () => {
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "",
    pageSize: "",
  });

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const configList = profileInfo?.find(
    (i: any) => i?.module_name === "Configuration"
  );

  const clientCategorySub = configList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === "Client Category"
  );

  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "100";
  const skipValue = Number(page) * Number(pageSize);
  const [filter, setFilter] = useState<IClientCategoryParams>({
    limit: 100,
    skip: skipValue - 100,
  });
  const { data, isLoading } = useGetClientCategoryQuery({ ...filter });
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Client Category",
        content: <CreateClientCategory />,
        show: true,
        width: 700,
      })
    );
  };

  return (
    <>
      <div>
        <Card
          styles={{
            header: {
              backgroundColor:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? "#C3E6CB"
                  : "#121212",
            },
          }}
          title={`Client Category List (${data?.total || 0})`}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
          extra={
            clientCategorySub?.permissions?.write && (
              <Row gutter={[5, 5]}>
                <Col xs={24} md={24} xxl={24}>
                  <PrimaryButton
                    name="Add New"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                  />
                </Col>
              </Row>
            )
          }
        >
          <div
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? "custom-table" : ""
            }
          >
            <Table
              rowKey={"id"}
              size="small"
              loading={isLoading}
              bordered
              dataSource={data?.data?.length ? data?.data : []}
              columns={ClientCategoryTableColumns(clientCategorySub)}
              scroll={{ x: true }}
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
              pagination={
                Number(data?.total) !== undefined && Number(data?.total) > 50
                  ? {
                      ...tablePagination,
                      current: Number(page),
                    }
                  : false
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default ClientCategory;
