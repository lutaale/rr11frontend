import Input from "../../Components/Input/Input";
import "./Styles.css";
import logorr11 from '../../img/cropped-logo-final-cropped.webp'
export default function Login() {
  return (
    <div className="login">
      <div className="img-system">
        <img src={logorr11}></img>
      </div>
      <div className="login-form">
        <h1>Login</h1>

        <form action="">
          <Input />
          <br />
          <strong>  
            Não tem cadastro? <a href="#">clique aqui</a>
          </strong>
        </form>
      </div>
    </div>
  );
}
