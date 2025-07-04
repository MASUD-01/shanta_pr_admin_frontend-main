import { useParams } from 'react-router-dom';
import PrintInvoice from '../../../common/printInvoice/PrintInvoice';
import { useGetSingleInvoiceQuery } from '../api/invoiceEndpoints';
import { ISingleInvoice } from '../types/invoiceTypes';
import GlobalLoader from '../../../app/utils/GlobalLoader';

const SingleInvoice = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleInvoiceQuery(Number(id));
  console.log(data);
  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <PrintInvoice data={data?.data as ISingleInvoice} />
      )}
    </>
  );
};

export default SingleInvoice;
