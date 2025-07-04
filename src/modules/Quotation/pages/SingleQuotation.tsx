// import PrintInvoice from "../../../common/printInvoice/PrintInvoice";

import { useParams } from "react-router-dom";
import { useGetSingleQuotationQuery } from "../api/quotationEndPoint";
import PrintQuotation from "../components/PrintQuotation";
import { ISingleQuotation } from "../types/quotationTypes";
import GlobalLoader from "../../../app/utils/GlobalLoader";

const SingleQuotation = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuotationQuery(Number(id));
  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <PrintQuotation data={data?.data as ISingleQuotation} />
      )}
    </>
  );
  // return <PrintInvoice />;
};

export default SingleQuotation;
