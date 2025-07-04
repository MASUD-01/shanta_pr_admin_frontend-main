const DashBoardCard = ({
  title,
  value,
  height,
}: {
  title: string;
  value: string | number;
  height?: number;
}) => {
  const numericValue = Number(String(value || 0)?.split(' ')[0]);
  const valueStyle = {
    color: numericValue < 0 ? 'red' : ' ',
  };
  return (
    <div className='dashboard-box-shape'>
      <div className='dashboard-card-bg'>
        <p className='dashboard-card-text'>{title}</p>
      </div>
      <div
        className='dashboard-card-body'
        style={{ height: height ? height : 80 + 'px' }}
      >
        <p style={valueStyle}>{value}</p>
      </div>
    </div>
  );
};

export default DashBoardCard;
