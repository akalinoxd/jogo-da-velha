import {Outlet, Link} from 'react-router-dom';
import './layout.css'

const Layout = () => {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <label for='home'>
                        <Link id='home' to="/">Home</Link>
                        </label>
                    </li>
                    <li>
                        <Link to="/jogo-da-velha">Jogo da Velha</Link>
                    </li>
                    <li>
                        <Link to="/novo-jogo">Novo Jogo</Link>
                    </li>
                    <li>
                        <Link to="/desafio-react" >Desafio React</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
            
        </>
    )
}

export default Layout
