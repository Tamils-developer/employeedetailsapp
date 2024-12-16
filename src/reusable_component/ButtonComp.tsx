import { isDisabled } from "@testing-library/user-event/dist/utils";
import React from "react";
import "./ButtunComp.css";

const ButtonComp = (props: any) => {
  const { disabled, onClick, buttonName, style, defaultValue, className, key,hidden,id } =
    props;
  return (
    <button
      style={style}
      defaultValue={defaultValue}
      disabled={disabled}
      hidden={hidden}   
      // onMouseOver={(e) => { console.log(e); }}
      key={key}
      id={id}
      className="reubtn"
      onClick={onClick}
    >
    {buttonName}
    </button>
  );
};

export default ButtonComp;
