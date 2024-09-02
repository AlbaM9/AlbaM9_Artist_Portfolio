import '../styles/header.scss'; // Importa los estilos globales
const Header = ({ title }) => {
    return (
        <div className="header">
            <img src="https://m.media-amazon.com/images/I/71BlMzossmL._AC_UF894,1000_QL80_.jpg" className="logo"></img>
            <h2>Holiwi</h2>
            <p>Se me da fatal esto eh, concretamente como el ogt</p>
        </div>
    );
};

export default Header;