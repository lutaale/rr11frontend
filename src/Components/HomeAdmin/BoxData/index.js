import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Styles.css";

const index = (props) => {
  return (
    <>
      <div className="box-data">
        <div className="data-color-box" style={{ backgroundColor: props.back }}>
          {" "}
          {props.image}
        </div>
      </div>
    </>
  );
};

export default index;
