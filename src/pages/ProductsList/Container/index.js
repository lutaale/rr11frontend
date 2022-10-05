import React from "react";
import "./Styles.css";
import Modal from "./Modal/modal";

const Container = (props) => {
  return (
    <div className="produto-center">
      <div className="produto-list">
        <img src={props.image} alt="produto" />{" "}
        <div className="product-ajust">
          <div className="produto-info">
            <h2>{props.tittle}</h2> <h2>R${props.preco}</h2>
          </div>
          <div className="modal-ajust">
            <Modal testId={props.id} produtos={props.tittle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
