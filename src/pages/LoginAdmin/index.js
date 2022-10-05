import React, { useState } from 'react'
import './adminlogin.css'
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'


export default function AdminLogin() {
    const { Login } = useContext(AuthContext)

    const [emailAdmin, setEmailAdmin] = useState('')
    const [senhaAdmin, setSenhaAdmin] = useState('')

    function fazerlogin(e) {
        e.preventDefault();
        if (emailAdmin === '' || senhaAdmin === '') {
            toast.error('Preencha todos os campos')
            return
        }
        Login(emailAdmin, senhaAdmin);
    }
    return (
        <div className='container-adminlogin'>
            <form id='form-admin' onSubmit={fazerlogin}>
                <div className='title-login-admin'><span>Login Admin</span></div>
                <div className='input-area'>
                    <input type='text' placeholder='Digite seu email' onChange={(e) => setEmailAdmin(e.target.value)}></input>
                    <input type='text' placeholder='Digite sua senha' onChange={(e) => setSenhaAdmin(e.target.value)}></input>
                    <button type='submit'>Entrar</button>
                    <Link style={{color:"#fff"}} to='/cadastroAdmin'>Não possui cadastro? clique aqui!</Link>
                </div>
            </form>
        </div>
    )
}