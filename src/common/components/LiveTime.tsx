import { CalendarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

function LiveTime() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateState(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = dateState.toLocaleDateString(
    "en-GB",
    options as Intl.DateTimeFormatOptions
  );

  return (
    <>
      <CalendarOutlined
        style={{
          // color: "#000000",
          fontWeight: "700",
        }}
      />
      <small
        style={{
          marginLeft: "5px",
          //color: "#000000",
          fontWeight: "700",
        }}
      >
        {formattedDate}
      </small>
    </>
  );
}

export default LiveTime;
