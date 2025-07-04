export const tablePagination = {
  defaultPageSize: 100,
  showSizeChanger: true,
  pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
};

export const generatePagination = (
  dataCount: number = 0,
  setPagination: React.Dispatch<
    React.SetStateAction<{
      current: number;
      pageSize: number;
    }>
  >,
  pagination: {
    current: number;
    pageSize: number;
  }
) => {
  return dataCount !== undefined && dataCount > 50
    ? {
        ...pagination,
        total: dataCount,
        showSizeChanger: true,
        pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
        onChange: (current: number, pageSize: number) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            current,
            pageSize,
          }));
        },
      }
    : false;
};
