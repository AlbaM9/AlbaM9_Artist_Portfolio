import '../styles/header.scss'; // Importa los estilos globales
const Header = ({ title }) => {
    return (
        <div className="header">
            <img src="/images/black_mark.png" className="logo"></img>

            <nav>
                <ul className="navMenu">
                    <li>About me</li>
                    <li>3D Models</li>
                    <li>3D Printings</li>
                    <li>Contact</li>
                </ul>
            </nav>


        </div>
    );
};

export default Header; 