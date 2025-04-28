import { useState } from "react";
import useCreateItem from "../hooks/useCreateItem";
import "../styles/App.css";

function ItemCreate() {
  const [formData, setFormData] = useState({
    title: "",
    article: "",
  });

  const { createItem, loading, error, success, newItem, resetState } =
    useCreateItem();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(formData);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      article: "",
    });
    resetState();
  };

  return (
    <div className="page">
      <h1>Créer un Item</h1>

      {success ? (
        <div>
          <div className="card">
            <h2>Item créé avec succès!</h2>
            <p>
              <strong>ID:</strong> {newItem.id}
            </p>
            <p>
              <strong>Titre:</strong> {newItem.title}
            </p>
            <p>
              <strong>Article:</strong> {newItem.article}
            </p>
          </div>
          <button onClick={handleReset}>Créer un autre item</button>
        </div>
      ) : (
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

          {error && <div className="error">Erreur: {error.error || error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Création en cours..." : "Créer"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ItemCreate;
