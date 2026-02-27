import React from "react";
import Snowfall from "react-snowfall";

interface SnowEffectProps {
  snowflakeCount?: number;
}

const SnowEffect: React.FC<SnowEffectProps> = ({
  snowflakeCount = 200,
}) => {
  return (
    <Snowfall
      snowflakeCount={snowflakeCount}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
};

export default SnowEffect;