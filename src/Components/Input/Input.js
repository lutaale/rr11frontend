import React, { useState, useEffect } from "react";
import "./Styles.css";
const Input = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <input
        placeholder="Email"
        type="Email"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <input
        placeholder="Senha"
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button id="submit">Submit</button>
    </>
  );
};

export default Input;
