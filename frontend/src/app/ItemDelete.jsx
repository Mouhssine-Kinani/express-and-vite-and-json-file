import { useState } from "react";
import useGetItemById from "../hooks/useGetItemById";
import useDeleteItem from "../hooks/useDeleteItem";
import "../styles/App.css";

function ItemDelete() {
  const [itemId, setItemId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const {
    item,
    loading: fetchLoading,
    error: fetchError,
    fetchItem,
  } = useGetItemById(null);
  const {
    deleteItem,
    loading: deleteLoading,
    error: deleteError,
    success,
    deletedItem,
    resetState,
  } = useDeleteItem();

  const handleSearch = (e) => {
    e.preventDefault();
    if (itemId) {
      setConfirmDelete(false);
      fetchItem(itemId);
      resetState();
    }
  };

  const handleConfirmDelete = async () => {
    await deleteItem(itemId);
  };

  const handleReset = () => {
    setItemId("");
    setConfirmDelete(false);
    resetState();
  };

  return (
    <div className="page">
      <h1>Supprimer un Item</h1>

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
            disabled={confirmDelete || success}
          />
        </div>
        {!confirmDelete && !success && (
          <button type="submit" disabled={fetchLoading}>
            {fetchLoading ? "Recherche..." : "Rechercher"}
          </button>
        )}
      </form>

      {fetchError && (
        <div className="error">Erreur: {fetchError.error || fetchError}</div>
      )}
      {deleteError && (
        <div className="error">Erreur: {deleteError.error || deleteError}</div>
      )}

      {item && !fetchLoading && !fetchError && !confirmDelete && !success && (
        <div className="card">
          <h2>{item.title}</h2>
          <p>{item.article}</p>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setConfirmDelete(true)}
              style={{ backgroundColor: "#d9534f" }}
            >
              Supprimer cet item
            </button>
          </div>
        </div>
      )}

      {confirmDelete && !success && (
        <div
          className="card"
          style={{ borderColor: "#d9534f", padding: "20px" }}
        >
          <h2>Êtes-vous sûr de vouloir supprimer cet item ?</h2>
          <p>Cette action est irréversible.</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={handleConfirmDelete}
              disabled={deleteLoading}
              style={{ backgroundColor: "#d9534f" }}
            >
              {deleteLoading ? "Suppression..." : "Confirmer la suppression"}
            </button>
            <button onClick={() => setConfirmDelete(false)}>Annuler</button>
          </div>
        </div>
      )}

      {success && (
        <div
          className="card"
          style={{ borderColor: "#5cb85c", marginTop: "20px" }}
        >
          <h2>Item supprimé avec succès!</h2>
          <p>L'item avec l'ID {deletedItem.id} a été supprimé.</p>
          <button onClick={handleReset} style={{ marginTop: "10px" }}>
            Supprimer un autre item
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemDelete;
