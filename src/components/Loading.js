import React, { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 5 ? prevDots + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        color: "white",
        fontFamily: "monospace",
        fontSize: "calc(16px + 0.2vw)",
      }}
    >
      {dots}
    </div>
  );
};

export default LoadingDots;
