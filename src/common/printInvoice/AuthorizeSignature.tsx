import { useGetMeQuery } from '../../app/api/userApi/userApi';
import { imageURL } from '../../app/slice/baseQuery';

const AuthorizeSignature = ({ checked }: { checked: boolean }) => {
  const { data: profile } = useGetMeQuery();
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ textAlign: 'right' }}>
          <p style={{ border: '1px solid gray' }}></p>
          <p style={{ margin: 0, color: 'black' }}>Customer Signature</p>
        </div>
        <div style={{ textAlign: 'left' }}>
          {checked ? (
            <img
              width={'100%'}
              height='30px'
              src={
                profile?.data?.company_signature &&
                imageURL + profile?.data?.company_signature
              }
              alt=''
            />
          ) : (
            ''
          )}

          <p style={{ border: '1px solid gray' }}></p>
          <p style={{ margin: 0, color: 'black' }}>Authorized Signature</p>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '10px', marginTop: '5px', color: 'black' }}>
          This is Software Generated Bill. M360ICT Property Management Developed
          By: M360 ICT
        </p>
      </div>
    </div>
  );
};

export default AuthorizeSignature;
