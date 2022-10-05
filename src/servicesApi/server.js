import { post } from "axios";
export default function handleSubmit() {
  let url = "https://apigspace.herokuapp.com/";
  const produto = document.getElementById("produto").value;
  const cor = document.getElementById("cor").value;
  const categoria = document.getElementById("categoria").value;
  const tamanho = document.getElementById("tamanho").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("description").value;
  const modelo = document.getElementById("modelo").value;

  const urlPostProducts = `${url}/produtos`;
  let config = {
    headers: {
      Authorization: "admin server",
    },
  };

  let data = {
    produto: produto,
    categoria: categoria,
    descricao: descricao,
    imgurl:
      "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg",
    preco: preco,
    tamanho: tamanho,
    cor: cor,
    modelo: modelo,
  };

  post(urlPostProducts, data, config).then((response) => {
    console.log(response.data);
    window.location.href = "http://127.0.0.1:3000/productsList";
  });
}
