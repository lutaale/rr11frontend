import { useContext, useState } from "react";
import { MdMenu, MdOutlineNotificationsActive } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import imageHeader from "../../img/logo.webp";
import { AuthContext } from "../../Contexts/auth";
import Container from "../ContainerForm";

import "./Styles.css";

const Header = () => {
  const { user, setModalSideBar } = useContext(AuthContext);
  function openModal() {
    setModalSideBar(true);
  }
  function OpenNotify() {
    const { notify, setNotify } = useState(false);
  }
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };
  return (
    <div>
      <div id="header">
        <div className="btn-menu-container">
          <button id="btn-menu" onClick={openModal}>
            <MdMenu size={30} color="black"></MdMenu>
          </button>
        </div>

        <div className="header-icons">
          <div className="logo-header">
            <img src={imageHeader} width="55" />
          </div>
          <div className="icons-header">
            <button onClick={OpenNotify}>
              <MdOutlineNotificationsActive size={25} color="black" />
            </button>

            <Container
              triggerText={<BsChatDots size={25} color="black" />}
              onSubmit={onSubmit}
            ></Container>

            <h2>Seja bem-vindo {user.nome}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
