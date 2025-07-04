export const DetailsView = ({
  title,
  value,
}: {
  title: string;
  value: number | string | undefined;
}) => {
  return (
    <div className='invoice-information-section'>
      <p className='info-title' style={{ color: 'black', width: '80px' }}>
        {title}
      </p>
      <p className='info-value'>
        <span className='font-semibold' style={{ color: 'black' }}>
          :
        </span>
        <span style={{ color: 'black' }}>{value}</span>
      </p>
    </div>
  );
};
