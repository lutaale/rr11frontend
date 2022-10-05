import { post } from "axios";
export default function sendMail() {
  let url = "https://apigspacemail.herokuapp.com";
  const name = document.getElementById("nameMail").value;
  const replyTo = document.getElementById("email").value;
  const text = document.getElementById("textMail").value;
  const urlSend = `${url}/send`;
  let config = {
    headers: {
      Authorization: "Send mailer",
    },
  };

  let data = {
    replyTo: replyTo,
    text: text,
  };

  post(urlSend, data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      alert(error);
    });
}
