
import { Link } from 'react-router-dom';
import './CSS/header.css';
const Header = () => {
    return( 
        <main className="container-main navbar navbar-dark bg-dark">
        <Link to={'/'}><img className="img" src="https://www.sistemasnetsolutions.com.br/manuais/SAC/imagens/cadastroproduto/icone.png" alt="" /></Link>
        <h2 style={{fontFamily:"'Rampart One', cursive"}}>e-commerce</h2>
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/Editar'}>Editar</Link></li>
        </ul>
    </main>
    )
}
export default Header;