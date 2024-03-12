import "../CSS/Home.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const [name, setName] = useState("")
    const [preco, setPreco] = useState("")

    //  setPergunta(pergunta.trim())
    // eslint-disable-next-line no-lone-blocks


    const saveTask = async () => {
        // eslint-disable-next-line no-unused-expressions
        let perguntas = name.trim();

        await axios.post('http://localhost:8080/Produto', {
            preco: preco,

            name: perguntas.charAt(0).toUpperCase() + perguntas.slice(1)

        }).then(sucesso => {
            setName("")
            setPreco("")
            notify()
        }).catch(error => {
            console.log(error)
            errorr()
        });

    }


    const notify = () => toast('Cadastrado Com Sucesso!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const editar = () => toast.success('Editado Com Sucesso!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const errorr = () => {
        toast.error('Não Foi Possível Cadastrar Sua Pergunta', {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const errorrr = () => {
        toast.error('Favor Não Insira o Ponto de Interrogação (?) ', {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const putTask = async (id) => {
        let perguntas = name.trim();
        const task = await axios.put("http://localhost:8080/Produto/" + id, {
            preco: preco,
            name: perguntas.charAt(0).toUpperCase() + perguntas.slice(1)

        }).then(sucesso => {
            setName("")
            setPreco("")
            editar()
        }).catch(error => {
            console.log(error)
            errorr()
        }); console.log(task)
    }
    const getTask = async () => {
        const task = await axios.get("http://localhost:8080/Produto/" + id);
        var ganbi = task.data.name
        var ganbi2 = ganbi.slice()
        var ganbi3 = ganbi2.charAt(0).toLowerCase() + ganbi2.slice(1)
        setName(ganbi3);
        setPreco(task.data.preco);
        console.log(task)
    }

    useEffect(() => {
        return () => {
            getTask()
        };
    }, [])
    const params = useParams();
    const id = params.id;
    const regex = /\W|_/;
    console.log(regex.test(name))

    const handleKeyPress = (event) => {
        const regex = /^[a-zA-Z\u00C0-\u00FF0-9\s]+$/; // Regex para permitir caracteres alfanuméricos, acentuados e espaços

        const inputChar = String.fromCharCode(event.charCode);

        if (!regex.test(inputChar)) {
            event.preventDefault(); // Bloqueia a entrada do caractere se não corresponder à expressão regular
        }
    };
    function mascaraMoeda(event) {
        // Obtém o valor do campo
        var valor = event.target.value;
      
        // Remove tudo o que não for dígito
        valor = valor.replace(/\D/g, '');
      
        // Divide o valor em milhares e adiciona a vírgula decimal
        valor = valor.replace(/(\d)(\d{3})(\d{2})$/, "$1.$2,$3");
      
        // Adiciona o prefixo de moeda (R$)
        valor = 'R$ ' + valor;
      
        // Atualiza o valor do campo
        event.target.value = valor;
      }
      
    return (
        <div className="container form">
            <h1 style={{ fontFamily: "Rubik Iso, cursive", color: "white", marginBottom: "20px" }}>E-Commerce</h1>
            <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Nome</span>
                <input type="text" className="form-control" onKeyPress={handleKeyPress} value={name} onChange={(txt) => setName(txt.target.value.toLowerCase())} aria-label="Username" placeholder="Insira o Nome do Produto" aria-describedby="basic-addon1" />
            </div>
            <div class="input-group mb-5">
                <span className="input-group-text">Preço</span>
                <input className="form-control" value={preco} onKeyPress={mascaraMoeda} placeholder="Insira a Preço" onChange={(txt) => setPreco(txt.target.value)} aria-label="With textarea" />
            </div>
            <ToastContainer />
            {id ?
                <Link to={"/"}>
                    <button type="button" className="btn btn-outline-info" onClick={() => putTask(id)}>
                        <img src="https://www.gs1br.org/hub-de-dados/servicos-e-solucoes/PublishingImages/diagnostico-de-cadastro-de-produtos/bene3.svg" alt="" />
                        Editar
                    </button>
                </Link>
                :
                <button type="button" className="btn btn-outline-info" onClick={() => saveTask()}>
                    <img src="https://www.gs1br.org/hub-de-dados/servicos-e-solucoes/PublishingImages/diagnostico-de-cadastro-de-produtos/bene3.svg" alt="" />
                    Cadastrar
                </button>
            }

        </div>
    )
}