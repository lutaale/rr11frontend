import React from "react";
import "./Styles.css";
import PostScript from "../../servicesApi/server";
import SideBar from "../../Components/SideBar";
import Header from "../../Components/Header";

const AdminCadastroProdutos = () => {
  const addPost = PostScript;
  return (
    <>
      <Header />
      <div className="side-product">
        <SideBar />
        <div className="create-products">
          <h1>Cadastro de produtos</h1>
          <form id="form-create" action="" onSubmit={addPost}>
            <input
              type="text"
              placeholder="Nome do produto"
              name="produto"
              id="produto"
            />
            <div className="input-categoria">
              <input type="text" name="cor" placeholder="cor" id="cor" />
              <input
                type="text"
                name="categoria"
                placeholder="categoria"
                id="categoria"
              />
            </div>
            <div className="input-number">
              <input
                type="text"
                name="modelo"
                id="modelo"
                placeholder="modelo"
              />
              <input
                type="text"
                name="tamanho"
                placeholder="tamanho"
                id="tamanho"
              />
              <input type="text" name="preco" placeholder="preço" id="preco" />
            </div>

            <textarea
              name=""
              id="description"
              cols="30"
              rows="10"
              placeholder="Descrição"
            ></textarea>

            <button id="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminCadastroProdutos;
