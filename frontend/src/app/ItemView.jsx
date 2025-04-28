import { useState } from "react";
import useGetItemById from "../hooks/useGetItemById";
import "../styles/App.css";

function ItemView() {
  const [itemId, setItemId] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const { item, loading, error, fetchItem } = useGetItemById(
    searchClicked ? itemId : null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (itemId) {
      setSearchClicked(true);
      fetchItem(itemId);
    }
  };

  return (
    <div className="page">
      <h1>Voir un Item</h1>

      <form onSubmit={handleSearch} className="form-group">
        <div className="form-group">
          <label htmlFor="itemId">ID de l'item</label>
          <input
            type="number"
            id="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Entrez l'ID de l'item"
            required
          />
        </div>
        <button type="submit">Rechercher</button>
      </form>

      {loading && <div>Chargement...</div>}

      {error && <div className="error">Erreur: {error.error || error}</div>}

      {item && !loading && !error && (
        <div className="card">
          <h2>{item.title}</h2>
          <p>{item.article}</p>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
        </div>
      )}

      {searchClicked && !loading && !error && !item && (
        <div className="error">Aucun item trouvé avec cet ID</div>
      )}
    </div>
  );
}

export default ItemView;
