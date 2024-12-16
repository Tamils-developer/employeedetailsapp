import React, { useState } from "react";

const New = () => {
  const [count, setCount] = useState(0);
  const [iD, setID] = useState() as any;

  
  const start = () => {
  let st = setInterval(() => {
    setCount((prev) => prev + 1);
    console.log("ss",st);
  }, 1000);
    setID(((p:any)=>st));
  };

  const stopp = () => {
    clearInterval(iD);
  };
  
  return (
    <div>
      <div>{count}</div>
      <button onClick={start}>Start</button>
      <button onClick={stopp}>Stop</button>
    </div>
  );
};

export default New;
