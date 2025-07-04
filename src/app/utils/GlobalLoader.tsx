import React from "react";
import { Spin } from "antd";

const GlobalLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: "4px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  </div>
);

export default GlobalLoader;
