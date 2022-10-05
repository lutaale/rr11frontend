import { put } from "axios";

function editProduct() {
  put().then((response) => {
    console.log(response.data);
    window.location.href = "http://127.0.0.1:3000/productsList";
  });
}
