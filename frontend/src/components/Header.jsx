import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Items Manager</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Tous les Items</Link>
          </li>
          <li>
            <Link to="/item/view">Voir un Item</Link>
          </li>
          <li>
            <Link to="/item/create">Créer un Item</Link>
          </li>
          <li>
            <Link to="/item/update">Modifier un Item</Link>
          </li>
          <li>
            <Link to="/item/delete">Supprimer un Item</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
