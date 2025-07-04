import { Card, Typography } from 'antd';
import style from '../style/Receipt.module.css';
import dayjs from 'dayjs';
import { InvoiceHeader } from '../../../common/invoice/InVoiceHeader';
import { ISingleMoneyReceipt } from '../types/moneyReceiptTypes';
import { NumToWord } from '../../../common/numberToWords/NumToWords';
import AuthorizeSignature from '../../../common/printInvoice/AuthorizeSignature';

interface IProps {
  singleData: ISingleMoneyReceipt;
  titleFor?: string;
  checked: boolean;
}
const MoneyReceiptCard = ({ singleData, titleFor, checked }: IProps) => {
  const { Title } = Typography;
  return (
    <>
      <Card
        className={style.card}
        style={{ background: 'white', color: 'black' }}
      >
        <div style={{ marginTop: '-15px' }}>
          <InvoiceHeader />
        </div>

        <Title
          style={{ textAlign: 'center', paddingTop: '5px', color: 'black' }}
          level={5}
        >
          MONEY RECEIPT <br /> {titleFor && `(${titleFor})`}
        </Title>
        <div className={style.info1}>
          <div className={style.disFlex}>
            <p style={{ marginRight: 5 }}>Receipt No:</p>
            <span className={style.spanText}>
              {singleData?.money_receipt_no
                ? singleData?.money_receipt_no
                : singleData?.transaction_no}
            </span>
          </div>
          <div className={style.disFlex}>
            <p style={{ marginRight: 5 }}>Date: </p>
            <span className={style.spanText2}>
              {dayjs(singleData?.payment_date).format('DD-MMM-YYYY')}
            </span>
          </div>
        </div>

        <div style={{ gap: 10 }} className={style.section1}>
          <div className={style.disFlex} style={{ flexGrow: 2 }}>
            <p>Received with thanks from : </p>
            <span className={style.spanText} style={{ flexGrow: 1 }}>
              <span style={{ fontWeight: 'bold' }} className={style.ms_1}>
                {singleData?.client_name}
              </span>
            </span>
          </div>
        </div>

        <div className={style.f_mt2}>
          <p>Amount of TK (In Word) :</p>
          <span className={style.spanText} style={{ flexGrow: 1 }}>
            <span>
              <NumToWord value={Number(singleData?.paid_amount)} />
            </span>
          </span>
        </div>
        {singleData?.payment_method == 'Cash' && (
          <div style={{ gap: 10 }} className={style.section1}>
            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Discount :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.discount || 0}</span>
              </span>
            </div>

            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Paid Via :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.payment_method}</span>
              </span>
            </div>

            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Account Name :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.account_name}</span>
              </span>
            </div>
          </div>
        )}

        {singleData?.payment_method == 'Bank' && (
          <div style={{ gap: 10 }} className={style.section1}>
            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Discount :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.discount}</span>
              </span>
            </div>

            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Paid Via :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.payment_method}</span>
              </span>
            </div>

            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Account Name :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.account_name}</span>
              </span>
            </div>
          </div>
        )}

        {singleData?.payment_method == 'Cheque' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10,
            }}
          >
            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Discount :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.discount || 0}</span>
              </span>
            </div>

            <div style={{ flexGrow: 1 }} className={style.disFlex}>
              <p>Paid Via :</p>
              <span style={{ flexGrow: 1 }} className={style.spanText}>
                <span className={style.ms_1}>{singleData?.payment_method}</span>
              </span>
            </div>

            <div style={{ flexGrow: 1 }} className={style.disFlex}>
              <p>Chq No :</p>
              <span style={{ flexGrow: 1 }} className={style.spanText}>
                <span className={style.ms_1}>{singleData.cheque_number}</span>
              </span>
            </div>

            <div style={{ flexGrow: 1 }} className={style.disFlex}>
              <p>Bank Name :</p>
              <span style={{ flexGrow: 1 }} className={style.spanText}>
                <span className={style.ms_1}>{singleData.bank_name}</span>
              </span>
            </div>
          </div>
        )}

        {singleData?.payment_method == 'Mobile Banking' && (
          <div style={{ gap: 10 }} className={style.section1}>
            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Discount :</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.discount || 0}</span>
              </span>
            </div>
            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Paid Via:</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.payment_method}</span>
              </span>
            </div>

            <div className={style.disFlex} style={{ flexGrow: 1 }}>
              <p>Account Name:</p>
              <span className={style.spanText} style={{ flexGrow: 1 }}>
                <span className={style.ms_1}>{singleData?.account_name}</span>
              </span>
            </div>
          </div>
        )}

        <div className={style.f_mt2} style={{ flexGrow: 1 }}>
          <p>Notes :</p>
          <span className={style.spanText} style={{ flexGrow: 1 }}>
            <span className={style.ms_1}>{singleData?.note}</span>
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div>
            <p>Amount of Taka : {singleData?.paid_amount} BDT</p>
          </div>
        </div>

        <div style={{ position: 'relative', marginTop: 50 }}>
          <AuthorizeSignature checked={checked} />
        </div>
      </Card>
    </>
  );
};

export default MoneyReceiptCard;
