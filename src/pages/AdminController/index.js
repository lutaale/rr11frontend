import React from "react";
import SideBar from "../../Components/SideBar";
import Header from "../../Components/Header";
import BoxHome from "../../Components/HomeAdmin";
import "./Style.css";

export default function AdminController() {
    return (
        <>
            <Header />
            <div className="box-center">
                <SideBar></SideBar>
                <BoxHome />
            </div>
        </>
    );
}
