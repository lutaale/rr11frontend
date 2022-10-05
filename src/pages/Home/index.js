import './home.css'
import { React, useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { MdMenu, MdAddShoppingCart, MdArrowLeft, MdArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import imgrr11 from '../../img/sobre-nos-rr11.webp'
import logo from '../../img/logo.png'
import logosemfundo from '../../img/cropped-logo-final-cropped.webp'
import logoloveme from '../../img/logo-loveme.webp'
import logomaxsports from '../../img/logo-1024x341.webp'
import logostark from '../../img/starkcuecas.webp'
import api from '../../services/api'
import { FiTrash } from 'react-icons/fi'
import SlideHome from '../../Components/SlideHome'
import { toast } from 'react-toastify'


export default function Home() {

    const [showmenu, setShowmenu] = useState(false)
    const [categoria, setCategoria] = useState([])
    const [modalCarrinho, setModalCarrinho] = useState(false)
    const [itensnocarrinho, setItensnocarrinho] = useState([])
    const [showvalorfinal, setShowvalorfinal] = useState([])
    const [dataProdutos, setDataProdutos] = useState([])
    const [modaldetails, setModaldetails] = useState(false)
    const [iteminfo, setIteminfo] = useState([])
    const [quantidade, setQuantidade] = useState('')
    const [cor, setCor] = useState('')
    const [tamanho, setTamanho] = useState('')
    const [corescolhida, setCorescolhida] = useState('')
    const [imginfoview, setImginfoview] = useState(null)
    const [menuitens, setMenuitens] = useState(false)
    const [menumarcas, setMenuMarcas] = useState(false)


    useEffect(() => {
        function loadmain() {
            localStorage.setItem('@valorapagar', '0')
            localStorage.setItem('valorfinal', '[]')
            localStorage.setItem('carrinho', '[]')

            const header = document.getElementById('header')

            document.addEventListener('scroll', function () {
                //guardando a posicao da pagina no eixo y
                var posicaoy = window.pageYOffset;
                if (posicaoy !== 0) {
                    document.getElementById('redes').setAttribute('style', 'display:none')
                    document.getElementById('menu').setAttribute('style', 'display:none')
                    document.getElementById('btnarea').setAttribute('style', 'display:flex')
                    document.querySelector('.header').classList.add('animationheader')
                } else {
                    document.querySelector('.header').classList.remove('animationheader')
                    document.getElementById('redes').setAttribute('style', 'display:flex')
                    document.getElementById('btnarea').setAttribute('style', 'display:none')
                    document.getElementById('menu').setAttribute('style', 'display:flex')
                    // header.setAttribute('style', 'background-attachment:fixed;')
                }
            })


            setShowvalorfinal(JSON.parse(localStorage.getItem('@valorapagar') || []))
            setItensnocarrinho(JSON.parse(localStorage.getItem('carrinho') || []))


            api.get('/produtos')
                .then((data) => {
                    setDataProdutos(data.data)
                })

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

        }
        loadmain()
    }, [])



    function closemenu() {
        setShowmenu(false)
    }

    function opemMenu() {
        setShowmenu(true)
    }

    function deletaritem(_id) {
        let filtro = itensnocarrinho.filter((item) => {
            return (item._id !== _id)
        })
        localStorage.setItem('carrinho', JSON.stringify(filtro) || [])
        localStorage.setItem('valorfinal', JSON.stringify(filtro) || [])
        window.location.reload();
    }



    function right() {
        let rigthcontent = document.querySelector('.pecas-populares')
        rigthcontent.scrollBy(-350, 0)
    }
    function left() {
        let leftcontent = document.querySelector('.pecas-populares')
        leftcontent.scrollBy(350, 0)
    }

    function showdetalhes(item) {
        setIteminfo(item)
        setModaldetails(true)
    }


    function closemodalview() {
        setModaldetails(false)
        setImginfoview(null)
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

    function showmenuitens() {
        setMenuitens(true)
        setMenuMarcas(false)
    }

    function showmenumarcas() {
        setMenuMarcas(true)
        setMenuitens(false)
    }



    return (
        <div className='container-home'>
            {modaldetails != false ? <div id='desfoca-fundo'>
                <div className="modaldetailsHome">

                    <div id="closemodaldetails">
                        <button onClick={closemodalview} id='btnclosedetailshome'>X</button>
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
                </div>
            </div> : ''}
            {modalCarrinho != false ? <div className="modalCarrinhoHome">
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

            {showmenu != false ? <div id='main-menu'>
                <div style={{
                    width: "90%", height: "40px", display: "flex", justifyContent: "flex-end", marginBottom: "15rem"
                }}><button style={{ border: "0", background: "transparent", color: "#fff", fontSize: "2rem", cursor: "pointer", marginTop: "20px" }} onClick={closemenu}>X</button></div>
                <button className='btnmenu'>Home</button>
                <button className='btnmenu'>Contato</button>
                <button className='btnmenu'>Sobre-nos</button>
                <Link to={'/login'} className='btnmenu' style={{ textDecoration: "none", textAlign: "center" }}>Minha conta</Link>
            </div> : ''}
            <header className='header'>
                <div className='redes-sociais' id='redes'>
                    <button onClick={() => window.location.href = 'https://www.facebook.com/rr11onlinestore'}><FaFacebook size={25} color="silver"></FaFacebook></button>
                    <button onClick={() => window.location.href = 'https://www.instagram.com/rr11.store/'}><FaInstagram size={25} color="silver"></FaInstagram></button>
                </div>
                <div className='logo-home'><img style={{ width: "110px" }} src={logosemfundo}></img></div>
                <div id='btnarea'>
                    <button onClick={() => window.location.href = '/'}>Home</button>
                    <button>Contato</button>
                    <button onClick={() => window.scrollTo({ top: 2800, behavior: "smooth" })}>Sobre-nos</button>
                    <Link to={'/login'} className="minhaconta">Minha conta</Link>
                    <button onClick={() => setModalCarrinho(true)} style={{ textDecorationLine: "none" }}><MdAddShoppingCart size={30} color='#fff'></MdAddShoppingCart><p style={{ width: "15px", height: "15px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "green", borderRadius: "50%", padding: "3px", textDecoration: "none" }}>
                        {itensnocarrinho.length}</p><span style={{ color: "white", marginLeft: "10px" }}>{showvalorfinal.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' })}</span></button>
                </div>
                <button className='menu' id='menu'><MdMenu color='#fff' size={40} onClick={opemMenu}></MdMenu></button>
            </header>
            <section className='section1'>
                <SlideHome></SlideHome>
            </section>
            <div className='category-area-btn'>
                <span>Escolher por Categoria</span>
                <div>
                    {menuitens == false ? <button className='btnitensmenu' onClick={showmenuitens}>Peça</button> :
                        <button className='btnitensmenu' onClick={() => setMenuitens(false)}>Peça</button>}
                    {menumarcas == false ? <button className='btnitensmenu' onClick={showmenumarcas}>Marca</button> :
                        <button className='btnitensmenu' onClick={() => setMenuMarcas(false)}>Marca</button>}
                </div>
                {menuitens != false ? <div className='category-btns'>
                    <Link to='/sutian'>Sutians</Link>
                    <Link to='/calcinha'>Calcinhas</Link>
                    <Link to='/camisola'>Camisolas</Link>
                </div> : ''}
                {menumarcas != false ? <div className='category-btns'>
                    <button onClick={() => window.location.href = 'https://www.maxsportmenswear.com.br/'}>MaxSports</button>
                    <button onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'}>lovemelingerie</button>
                    <button onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'}>StarkCuecas</button>
                </div> : ''}

            </div>
            <div className='title-category'><h2>Peças Populares</h2></div>
            <article className='pecas-populares'>
                <button id='btnleft' onClick={right}><MdArrowLeft size={70} color='red'></MdArrowLeft></button>
                <button id='btnright' onClick={left}><MdArrowRight size={70} color='red'></MdArrowRight></button>
                {dataProdutos.map((item) => {
                    return (
                        <div key={item._id} className='box-item'>
                            <img src={item.imgurl}></img>
                            <strong>{item.modelo}</strong>
                            <p>R${item.preco}</p>
                            <button onClick={() => showdetalhes(item)}>Ver detalhes</button>
                        </div>
                    )
                })}
            </article>
            <section className='section2'>
                <div className='categoryArea'>
                    <button className='box-category' id='box1' onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'}>
                        <img style={{ background: "black", borderRadius: "5px" }} src={logoloveme}></img>
                    </button>
                    <button className='box-category' id='box2' onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'}>
                        <img style={{ borderRadius: "5px", width: "60%" }} src={logostark}></img>
                    </button>
                    <button className='box-category' id='box3' onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'} >
                        <h2>marca3</h2>
                    </button>
                    <button className='box-category' id='box4' onClick={() => window.location.href = ' https://www.maxsportmenswear.com.br/'} >
                        <img src={logomaxsports}></img>
                    </button>
                </div>
            </section>
            <div className='text-area'>
                <h1>Texto</h1>
            </div>
            <section className='section3'>
                <div className='banner1'>
                    <img src={logomaxsports}></img>
                    <button onClick={() => window.location.href = 'https://www.maxsportmenswear.com.br/'}>Ver coleção</button>
                </div>
                <div className='banner2'>
                    <img src={logoloveme}></img>
                    <button onClick={() => window.location.href = 'https://www.lovemelingerie.com.br/'}>Ver coleção</button>
                </div>
            </section>
            <section className='section4'>
                <div className='imagem'>
                    <img src={imgrr11}></img>
                </div>
                <div className='text-sobrenos'>
                    <div style={{ textAlign: "start" }}>
                        <h2 style={{ color: "#fff", fontSize: "2rem" }}>SOBRE NÓS</h2>
                        <p>A <strong style={{ color: "red", fontSize: "1.5rem" }}>RR11</strong> surgiu da nossa vontade de oferecer produtos produtos de qualidade e ideias inovadoras.</p><br></br>
                        <p>Nosso maior comprometimento é com a satisfação dos clientes!</p>
                    </div>
                </div>
            </section>
            <footer>
                <div className='send-email-area'>
                    <div className='nome-title'>
                        <div style={{ textAlign: "start" }}>
                            <p>NEWSLETTER</p>
                            <span>LISTA VIP</span>
                        </div>
                    </div>
                    <div className='input-send-email'>
                        <div style={{ display: "flex", width: '100%', alignItems: "center" }}>
                            <input type='text' placeholder='Digite seu email'></input>
                            <button>Enviar</button>
                        </div>
                    </div>
                </div>
                <div className='information-footer'>
                    <div className='btn-footer'>
                        <span>Institucional</span>
                        <Link>Inicio</Link>
                        <Link>Loja</Link>
                        <Link>Contatos</Link>
                        <Link>Politica de privacidade</Link>
                    </div>
                    <div className='img-footer-info'>
                        <img src={logosemfundo} id='imglogo'></img>
                        <p>
                            Endereço: Estrada Rj 146, Km 4, número 605. Bairro: Alto de São José Município: Bom jardim -
                            Rio de Janeiro- Rj CEP: 28.660-000</p><br></br>
                        <p>contato@lingerieatacadofriburgo.com.br</p>
                    </div>
                </div>
                <div id='linha'></div>
                <p>Copyright 2022 © RR11 Distribuidora de peças íntimas LTDA. CNPJ: 37.024.741/0001-12</p>
            </footer>
        </div>
    )
}