const SupportDetails = () => {
  return (
    <div
      style={{
        marginTop: '20px',
        textAlign: 'center',
        padding: '10px 5px',
        background: '#f9f9f9',
        borderRadius: '5px',
        border: '1px solid #ddd',
        color: '#107A9F',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '8px',
          fontFamily: 'revert',
        }}
      >
        Support Details
      </p>
      <p
        style={{
          fontSize: '12px',
          color: '#107A9F',
          marginBottom: '2px',
        }}
      >
        Call: 09638-336699, 01958398325, 01958398313, +880 1958-398308
      </p>

      <p
        style={{
          fontSize: '12px',

          marginBottom: '2px',
          marginRight: '10px',
        }}
      >
        Timing : 10:00AM to 06:00PM
      </p>
      <p style={{ fontSize: '12px' }}>
        Email : <a href='mailto:sup.m360ict@gmail.com'>sup.m360ict@gmail.com</a>
      </p>
    </div>
  );
};

export default SupportDetails;
