import { createContext, React, useContext, useEffect, useState } from "react";
import firebase from "../services/firebaseconnection";

import { toast } from "react-toastify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // const {user} = useContext(AuthContext);
    const [modalSideBar, setModalSideBar] = useState(false);
    useEffect(() => {
        function loadsessao() {
            const sessao = JSON.parse(localStorage.getItem("sessaouser"));

            if (sessao) {
                setUser(sessao);
            }
        }
        loadsessao();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                Login,
                Cadastro,
                signed: !!user,
                setUser,
                sair,
                openSideBar,
                setModalSideBar,
                modalSideBar,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

    function sotrageUser(data) {
        localStorage.setItem("sessaouser", JSON.stringify(data));
    }

    //funcao criar usuario

    async function Cadastro(nomeAdmin, emailAdmin, telefone, loja, senhaAdmin) {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAdmin, senhaAdmin)
            .then(async (value) => {
                let uid = value.user.uid;

                await firebase
                    .firestore()
                    .collection(uid)
                    .doc(uid)
                    .set({
                        uid: uid,
                        nome: nomeAdmin,
                        telefone: telefone,
                        email: emailAdmin,
                        nomeLoja: loja,
                        imgUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nomeAdmin,
                            telefone: telefone,
                            email: emailAdmin,
                            nomeLoja: loja,
                            imgUrl: null,
                        };
                        setUser(data);
                        toast.success("usuario cadastrado com sucesso");
                        window.location.href = "/AdminLogin";
                    })
                    .catch((error) => {
                        alert(error);
                    });
            });
    }

    //funcao fazer login

    async function Login(emailAdmin, senhaAdmin) {
        await firebase
            .auth()
            .signInWithEmailAndPassword(emailAdmin, senhaAdmin)
            .then(async (value) => {
                let uid = value.user.uid;

                const Datauser = await firebase
                    .firestore()
                    .collection(uid)
                    .doc(uid)
                    .get();
                let data = {
                    uid: uid,
                    nome: Datauser.data().nome,
                    telefone: Datauser.data().telefone,
                    email: emailAdmin,
                    nomeLoja: Datauser.data().nomeLoja,
                    imgUrl: null,
                };
                setUser(data);
                sotrageUser(data);
            })
            .catch(() => {
                toast.error("usuario incorreto ou nao cadastrado");
            });
    }

    async function sair() {
        await firebase.auth().signOut();
        localStorage.removeItem("sessaouser");
        setUser(null);
    }

    function openSideBar(e) {
        setModalSideBar(e);
    }
}
