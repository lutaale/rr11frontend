import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/auth";
import { CgCloseO } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

import "./SideBar.css";
// export const modalSide = createContext();
const SideBar = () => {
  const { sair, setModalSideBar, modalSideBar } = useContext(AuthContext);

  function hiddenSide() {
    setModalSideBar(false);
  }

  function logout() {
    sair();
  }
  return (
    <div>
      {modalSideBar != false ? (
        <aside>
          <div id="title-Side">
            <button id="hiddenSide" onClick={hiddenSide}>
              <CgCloseO size={20} color="white" />
            </button>
            <h1>SideBar</h1>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/create">Cadastro</Link>
            </li>
            <li>
              <Link to="/productsList">Lista de produtos</Link>
            </li>
            <li>
              <Link to="/Pedidos">Pedidos</Link>
            </li>
          </ul>
          <p>Footer</p>
          <div id="ajusOutLogin">
            <button id="outLogin" onClick={logout}>
              <BiLogOut size={25} color="white" /> Sair
            </button>
          </div>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
