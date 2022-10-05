import { Switch } from "react-router-dom";
import Route from "../services/Private";

import Home from "../pages/Home";
import Cadastro from "../pages/CadastroAdmin";
import Login from "../pages/Login";
import LoginAdmin from "../pages/LoginAdmin";
import AdminController from "../pages/AdminController";
import Produtoview from "../pages/Produtoview";
import ProductsList from "../pages/ProductsList";
import AdminCadastroProdutos from "../pages/AdminCadastroProdutos";
import Pedidos from "../pages/Pedido";

export default function RouteApp() {
    return (
        <Switch>
            <Route exact path={"/"} component={Home}></Route>
            <Route exact path={"/cadastroAdmin"} component={Cadastro}></Route>
            <Route exact path={"/login"} component={Login}></Route>
            <Route
                exact
                path={"/Admincontroller"}
                component={AdminController}
                isPrivate
            ></Route>
            <Route
                exact
                path={"/ProductsList"}
                component={ProductsList}
                isPrivate
            ></Route>
            <Route
                exact
                path={"/create"}
                component={AdminCadastroProdutos}
                isPrivate
            ></Route>
            <Route exact path={"/AdminLogin"} component={LoginAdmin}></Route>
            <Route exact path={"/:produtoparamer"} component={Produtoview}></Route>
            <Route exact path={"/Pedidos"} component={Pedidos}></Route>
        </Switch>
    );
}
