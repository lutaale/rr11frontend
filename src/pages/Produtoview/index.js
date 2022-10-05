import React, { useEffect, useState } from "react"
import api from "../../services/api"
import { useParams, Link } from 'react-router-dom'
import './produto.css'
import logorr11 from '../../img/cropped-logo-final-cropped.webp'
import { MdArrowBack, MdAddShoppingCart, MdFilterListAlt } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Produtoview() {
    const { produtoparamer } = useParams();

    const [produto, setProduto] = useState([])
    const [modaldetails, setModaldetails] = useState(false)
    const [iteminfo, setIteminfo] = useState([])
    const [quantidade, setQuantidade] = useState('')
    const [modalCarrinho, setModalCarrinho] = useState(false)
    const [itensnocarrinho, setItensnocarrinho] = useState([])
    const [cor, setCor] = useState('')
    const [imginfoview, setImginfoview] = useState(null)
    const [tamanho, setTamanho] = useState('')
    const [corescolhida, setCorescolhida] = useState('')
    const [showvalorfinal, setShowvalorfinal] = useState([])

    useEffect(() => {
        async function loadprodutos() {

            const response = await api.get(`/produto?produto=${produtoparamer}`)
            setProduto(response.data)
            if (itensnocarrinho.length === 0) {
                setModalCarrinho(false)
            }
        }
        loadprodutos()

        setItensnocarrinho(JSON.parse(localStorage.getItem('carrinho') || []))
        const arrvalorfinal = (JSON.parse(localStorage.getItem('valorfinal') || []))

        let soma = 0
        let novoarray = []
        arrvalorfinal.map((item) => {
            novoarray.push(item.preco)
        })

        for (let i = 0; i < novoarray.length; i++) {
            soma += novoarray[i]
        }

        localStorage.setItem('@valorapagar', JSON.stringify(soma.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' })))
        setShowvalorfinal(JSON.parse(localStorage.getItem('@valorapagar') || []))

    }, [])

    function showdetalhes(item) {
        setIteminfo(item)
        setModaldetails(true)
    }

    function additem(iteminfo, quantidade) {

        if (quantidade < 1) {
            toast.error('Quantidade min: 1 item')
            return;
        }
        if (corescolhida === '') {
            toast.error('ecolha a cor')
            return;
        }
        if (tamanho === '') {
            toast.error('escolha o tamanho')
            return;
        }

        const datacart = JSON.parse(localStorage.getItem('carrinho') || [])
        const valorfinal = JSON.parse(localStorage.getItem('valorfinal') || [])

        datacart.push({
            _id: iteminfo._id,
            produto: iteminfo.produto,
            modelo: iteminfo.modelo,
            categoria: iteminfo.categoria,
            imgurl: iteminfo.imgurl,
            descricao: iteminfo.descricao,
            preco: iteminfo.preco * quantidade,
            tamanho: tamanho,
            cor: corescolhida,
            quantidade: quantidade
        })

        valorfinal.push({
            _id: iteminfo._id,
            preco: iteminfo.preco * quantidade
        })

        localStorage.setItem('carrinho', JSON.stringify(datacart))
        localStorage.setItem('valorfinal', JSON.stringify(valorfinal))
        toast.success('item adicionado com sucesso')
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    function deletaritem(_id) {
        let filtro = itensnocarrinho.filter((item) => {
            return (item._id !== _id)
        })
        setItensnocarrinho(filtro)
        localStorage.setItem('carrinho', JSON.stringify(filtro) || [])
        localStorage.setItem('valorfinal', JSON.stringify(filtro) || [])

        window.location.reload();
    }

    function abrirmodal() {
        if (itensnocarrinho.length > 0) {
            setModalCarrinho(true)
        } else {
            toast.error('carrinho vazio!')
        }
    }
    async function filtrar(cor) {
        if (cor === '') {
            return;
        }
        let filtrocor = produto.filter((item) => {
            return (item.cor == cor)
        })
        setProduto(filtrocor)
    }


    function closemodalview() {
        setModaldetails(false)
        setImginfoview(null)
    }


    return (
        <div id="content-main">
            <header>
                <button onClick={() => window.location.href = '/'}><MdArrowBack size={40} color='white'></MdArrowBack></button>
                <img src={logorr11}></img>
                <button className="animationcart" onClick={abrirmodal}><MdAddShoppingCart size={30} color='#fff'></MdAddShoppingCart><p style={{
                    width: "15px", height: "15px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "green", borderRadius: "50%", padding: "2px"
                }}>{itensnocarrinho.length}</p> <span style={{ color: "white", marginLeft: "10px" }}>{showvalorfinal.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' })}</span></button>
            </header>
            <h2>Peças exclusivas!</h2>
            <div id="filtro">
                <select onChange={(e) => setCor(e.target.value)}>
                    <option value=''>Cores</option>
                    {produto.map((itemcor) => {
                        return (
                            <>
                                <option value={itemcor.cor}>{itemcor.cor}</option>
                            </>
                        )
                    })}
                </select><button onClick={() => filtrar(cor)}><MdFilterListAlt size={20}></MdFilterListAlt> <p style={{ fontSize: "10px", textTransform: "capitalize" }}>{cor}</p></button><button onClick={() => window.location.reload()}>Limpar</button>
            </div>
            <article id="itens-api">

                {produto.map((item) => {
                    return (
                        <div id="item" key={item.id}>
                            <img style={{ width: "300px", height: "300px", objectFit: "cover" }} src={item.imgurl}></img>
                            <span>{item.modelo}</span>
                            <strong>R${item.preco}</strong>
                            <button id="btn-maisdetails" onClick={() => showdetalhes(item)}>Mais detalhes</button>
                        </div>
                    )
                })}
            </article>
            {modaldetails != false ? <div className="modaldetails">
                <div id="closemodaldetails">
                    <button onClick={closemodalview} id='btnclosedetails'>X</button>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                    <img style={{ width: "300px", height: "300px", objectFit: "cover" }} src={imginfoview == null ? iteminfo.imgurl : imginfoview}></img>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <button onClick={() => setImginfoview(iteminfo.imgurl)}>{iteminfo.imgurl === '' ? '' : <img className="styleimg" id="img1" src={iteminfo.imgurl}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl2)}>{iteminfo.imgurl2 === '' ? '' : <img className="styleimg" id="img2" src={iteminfo.imgurl2}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl3)}>{iteminfo.imgurl3 === '' ? '' : <img className="styleimg" id="img3" src={iteminfo.imgurl3}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl4)}>{iteminfo.imgurl4 === '' ? '' : <img className="styleimg" id="img4" src={iteminfo.imgurl4}></img>}</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <button onClick={() => setImginfoview(iteminfo.imgurl5)}>{iteminfo.imgurl5 === '' ? '' : <img className="styleimg" id="img5" src={iteminfo.imgurl5}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl6)}>{iteminfo.imgurl6 === '' ? '' : <img className="styleimg" id="img6" src={iteminfo.imgurl6}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl7)}>{iteminfo.imgurl7 === '' ? '' : <img className="styleimg" id="img7" src={iteminfo.imgurl7}></img>}</button>
                        <button onClick={() => setImginfoview(iteminfo.imgurl8)}>{iteminfo.imgurl8 === '' ? '' : <img className="styleimg" id="img8" src={iteminfo.imgurl8}></img>}</button>
                    </div>
                </div>
                <span>{iteminfo.modelo}</span>
                <span id="descricao">{iteminfo.descricao}</span>
                <span>Cores disponiveis</span>
                <div id="colorsOptions">
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.cor} onChange={() => setCorescolhida(iteminfo.cor)}></input>
                        <span>{iteminfo.cor}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.cor2} onChange={() => setCorescolhida(iteminfo.cor2)}></input>
                        <span>{iteminfo.cor2}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.cor3} onChange={() => setCorescolhida(iteminfo.cor3)}></input>
                        <span>{iteminfo.cor3}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.cor4} onChange={() => setCorescolhida(iteminfo.cor4)}></input>
                        <span>{iteminfo.cor4}</span>
                    </div>
                </div>
                <span>Tamanhos disponiveis</span>
                <div id="tamanhosOptions">

                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.tamanho} onChange={() => setTamanho(iteminfo.tamanho)}></input>
                        <span>{iteminfo.tamanho}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.tamanho2} onChange={() => setTamanho(iteminfo.tamanho2)}></input>
                        <span>{iteminfo.tamanho2}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.tamanho3} onChange={() => setTamanho(iteminfo.tamanho3)}></input>
                        <span>{iteminfo.tamanho3}</span>
                    </div>
                    <div className="colorBox">
                        <input type="checkbox" value={iteminfo.tamanho4} onChange={() => setTamanho(iteminfo.tamanho4)}></input>
                        <span>{iteminfo.tamanho4}</span>
                    </div>
                </div>
                <strong>R${iteminfo.preco}</strong>
                <div style={{ display: "flex" }}></div>
                <div id="box-tamanho-cor"><input type='number' onChange={(e) => setQuantidade(e.target.value)} placeholder='0' min={1}></input></div>
                <button id="addcarrinho" onClick={() => additem(iteminfo, quantidade)}>Adicionar no carrinho</button>
            </div> : ''}
            {modalCarrinho != false ? <div className="modalCarrinho">
                <div id="closecart"><button onClick={() => setModalCarrinho(false)}>X</button></div>
                <article id="info-item-carrinho">
                    {itensnocarrinho.map((item) => {
                        return (
                            <div className="content-cart">
                                <img src={item.imgurl}></img>
                                <span>{item.modelo}</span>
                                <span>Cor: {item.cor}</span>
                                <span>Tamanho: {item.tamanho}</span>
                                <span>Qtd: {item.quantidade}</span>
                                <strong>R${item.preco}</strong>
                                <button id="trash" onClick={() => deletaritem(item._id)}><FiTrash size={25} color='#fff'></FiTrash></button>
                            </div>
                        )
                    })}
                </article>
                <div id="pagamento">
                    <span>Pagamento</span>
                    <h3 className='valortotal'>Total: {showvalorfinal.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' })}</h3>
                </div>
            </div> : ''}
        </div>

    )
}