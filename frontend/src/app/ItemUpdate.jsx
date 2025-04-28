import { useState, useEffect } from "react";
import useGetItemById from "../hooks/useGetItemById";
import useUpdateItem from "../hooks/useUpdateItem";
import "../styles/App.css";

function ItemUpdate() {
  const [itemId, setItemId] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const {
    item,
    loading: fetchLoading,
    error: fetchError,
    fetchItem,
  } = useGetItemById(null);
  const {
    updateItem,
    loading: updateLoading,
    error: updateError,
    success,
    resetState,
  } = useUpdateItem();

  const [formData, setFormData] = useState({
    title: "",
    article: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        article: item.article || "",
      });
    }
  }, [item]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (itemId) {
      setSearchClicked(true);
      fetchItem(itemId);
      resetState();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(itemId, formData);
  };

  const handleReset = () => {
    setItemId("");
    setFormData({
      title: "",
      article: "",
    });
    setSearchClicked(false);
    resetState();
  };

  return (
    <div className="page">
      <h1>Modifier un Item</h1>

      {!item || success ? (
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
          <button type="submit" disabled={fetchLoading}>
            {fetchLoading ? "Recherche..." : "Rechercher"}
          </button>
          {fetchError && (
            <div className="error">
              Erreur: {fetchError.error || fetchError}
            </div>
          )}

          {success && (
            <div className="card" style={{ marginTop: "20px" }}>
              <h2>Item mis à jour avec succès!</h2>
              <button onClick={handleReset} style={{ marginTop: "10px" }}>
                Modifier un autre item
              </button>
            </div>
          )}
        </form>
      ) : (
        <div>
          <div className="card">
            <h3>Modifier l'item #{itemId}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Entrez le titre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="article">Article</label>
                <textarea
                  id="article"
                  name="article"
                  value={formData.article}
                  onChange={handleChange}
                  placeholder="Entrez le contenu de l'article"
                  rows="5"
                  required
                />
              </div>

              {updateError && (
                <div className="error">
                  Erreur: {updateError.error || updateError}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={updateLoading}>
                  {updateLoading ? "Mise à jour..." : "Mettre à jour"}
                </button>
                <button type="button" onClick={handleReset}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemUpdate;
