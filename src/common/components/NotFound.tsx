import errorLogo from "../../../public/404 Error-rafiki.png";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        height={400}
        width={500}
        style={{ alignItems: "center" }}
        src={errorLogo}
      />
    </div>
  );
};

export default NotFound;
