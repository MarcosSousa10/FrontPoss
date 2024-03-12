import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Css.css'
export const Editar = () => {
    const [data, setData] = useState([])
    //const [id, setId] = useState("")

    useEffect(() => {
        return () => {
            Listagem()
        };
    }, [])
    const Listagem = async () => {
        const tudo = (await axios.get('http://localhost:8080/Produto'));
        setData(tudo.data)
    }
    const deletar = async (id) => {
        await axios.delete("http://localhost:8080/Produto/" + id).then(serto =>{
            notify()
         Listagem()
        }).catch(errorr)

        
    }
    const link = "https://cdn-icons-png.flaticon.com/512/2652/2652218.png"
    const notify = () => toast.success('Deletado!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    const errorr =()=>{toast.error('A Algo De Errado!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });}
    return (
        <div className="altura">
            <ul style={{
                display: "flex", flexWrap: "wrap", flexDirection: "row",
                justifyContent: "space-between"
            }}>
                {data.map(item => {
                    return (
                        <div key={item.id}>

                            <div
                                className="card"
                                style={{ width: "20rem", minHeight: "18rem", margin: "10px" }}>

                                <img
                                    style={{ height: "5rem" }}
                                    className="card-img-top"
                                    src={link}
                                    alt="Card  cap" />

                                <div className="card-body">
                                    <Link
                                        to={"/" + item.id}>
                                        <h5 className="card-title">
                                            {item.name}
                                        </h5>
                                    </Link>
                                    <p className="card-text">
                                        {item.preco}
                                    </p>

                                </div>

                                <Link><button style={{ margin: "20px" }}
                                    onClick={() => deletar(item.id)}
                                    className="btn btn-outline-primary">
                                    Deletar
                                </button>
                                </Link>
                                <ToastContainer />
                            </div>



                        </div>

                    )

                })}
            </ul>



        </div>
    )
}