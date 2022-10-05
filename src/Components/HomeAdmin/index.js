import React from "react";
import BoxData from "./BoxData";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImGooglePlus } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import TabelaProdutos from "../Tabela/index";
import "./Styles.css";

const index = () => {
  return (
    <>
      <div className="admin-dash">
        <h1>Admin Dashboard</h1>
        <div id="box-data-ajust">
          <BoxData
            back="green"
            image={<AiOutlineShoppingCart size={50} color="white" />}
          />

          <BoxData
            back="red"
            image={<ImGooglePlus size={50} color="white" />}
          />
          <BoxData back="blue" image={<FaUsers size={50} color="white" />} />
          <BoxData back="black" image={<BsPlusLg size={50} color="white" />} />
        </div>
        <div id="box-home">
          <TabelaProdutos />
        </div>
      </div>
    </>
  );
};

export default index;
