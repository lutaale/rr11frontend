import React from "react";
import PostSend from "../../servicesApi/mailer";
import "./Styles.css";

export const Form = ({ onSubmit, e }) => {
  const send = PostSend;

  return (
    <form id="form-suporte" action="" onSubmit={send}>
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <br />
        <input
          type="name"
          className="form-control"
          id="nameMail"
          placeholder="Nome"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="nome@example.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Descreva o seu problema</label>
        <br />
        <input
          type="text"
          className="form-control"
          id="textMail"
          placeholder="Escreva aqui a sua duvida..."
        />
      </div>
      <div className="form-group">
        <button
          id="btn-sup"
          className="form-control btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
