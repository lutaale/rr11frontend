import './cad.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/auth'

export default function Cadastro() {

    const { Cadastro } = useContext(AuthContext)

    const [nomeAdmin, setNomeAdmin] = useState()
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [loja, setLoja] = useState('')
    const [senha, setSenha] = useState('')

    function cadastroAdmin(e) {
        e.preventDefault();
        Cadastro(nomeAdmin, email, telefone, loja, senha);
        setNomeAdmin('')
        setEmail('')
        setTelefone('')
        setSenha('')
        setLoja('')
    }
    return (
        <div className='container-cadastro'>
            <div className='logo'>
                <span style={{ color: "white" }}>Aqui vai a logo</span>
            </div>
            <span id='linha'></span>
            <div className='form-area'>
                <div className='title-form'><h2>Cadastro Admin</h2></div>
                <form onSubmit={cadastroAdmin}>
                    <input type='text' placeholder='Nome completo' onChange={(e) => setNomeAdmin(e.target.value)}></input>
                    <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='text' placeholder='telefone' onChange={(e) => setTelefone(e.target.value)} ></input>
                    <input type='text' placeholder='Nome da sua loja' onChange={(e) => setLoja(e.target.value)} ></input>
                    <input type='text' placeholder='Escolha uma senha' onChange={(e) => setSenha(e.target.value)} ></input>
                    <button type='submit'>Cadastrar</button>
                    <Link to={'/AdminLogin'}>Já possui cadastro? Faça login</Link>
                </form>
            </div>
        </div>
    )
}