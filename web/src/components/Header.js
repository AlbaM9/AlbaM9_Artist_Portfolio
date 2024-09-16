import '../styles/header.scss'; // Importa los estilos globales
const Header = ({ title }) => {
    return (
        <div className="header">
            <img src="https://m.media-amazon.com/images/I/71BlMzossmL._AC_UF894,1000_QL80_.jpg" className="logo"></img>

            <nav>
                <ul className="navMenu">
                    <li>About me</li>
                    <li>Gallery</li>
                    <li>3D Models</li>
                    <li>3D Printings</li>
                    <li>Contact</li>
                </ul>
            </nav>


        </div>
    );
};

export default Header;