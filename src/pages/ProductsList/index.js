import React, { useEffect, useState } from "react";
import "./Styles.css";
import Container from "./Container/index";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";

const ListProducts = () => {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    fetch("https://apigspace.herokuapp.com/produtos")
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data);
      });
  }, []);
  return (
    <>
      {" "}
      <Header />
      <div className="side-product">
        <SideBar />
        <div className="list-products">
          {produtos.map((produto) => {
            return (
              <Container
                key={produto._id}
                image={produto.imgurl}
                tittle={produto.produto}
                preco={produto.preco}
                id={produto._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListProducts;
