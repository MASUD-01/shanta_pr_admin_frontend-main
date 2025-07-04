/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Table, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useState } from "react";
import { tablePagination } from "../../../common/TablePagination";
import { PrimaryButton } from "../../../common/submitButton/CommonButton";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useSearchParams } from "react-router-dom";
import { CreateFlatTableColumns } from "../utils/CreateFlatTableColumns";
import { useGetAddFlatsQuery } from "../api/AddFlatEndPoint";
import CreateFlatDetailsCategory from "../component/CreateFlatDetailsCategory";

const CreateFlatDetailsPage = () => {
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "",
    pageSize: "",
  });

  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "100";
  const skipValue = Number(page) * Number(pageSize);
  const [filter, setFilter] = useState<any>({
    limit: 100,
    skip: skipValue - 100,
  });
  const { data, isLoading } = useGetAddFlatsQuery({ ...filter });
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Project",
        content: <CreateFlatDetailsCategory />,
        show: true,
        width: 700,
      })
    );
  };

  return (
    <>
      <div>
        <Card
          // styles={{
          //   header: {
          //     backgroundColor:
          //       themeGlobal.theme === theme.defaultAlgorithm
          //         ? '#C3E6CB'
          //         : '#121212',
          //   },
          // }}
          title={`Add Flat Details list (${data?.total || 0})`}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
          extra={
            <Row gutter={[5, 5]}>
              <Col xs={24} md={24} xxl={24}>
                <PrimaryButton
                  name="Add New"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                />
              </Col>
            </Row>
          }
        >
          <div
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? "custom-tab" : " "
            }
          >
            <Table
              rowKey={"id"}
              size="small"
              loading={isLoading}
              bordered
              dataSource={data?.data?.length ? data?.data : []}
              columns={CreateFlatTableColumns()}
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

export default CreateFlatDetailsPage;
