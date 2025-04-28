import useFetchAllItems from "../hooks/getAllItems.jsx";
import "../styles/App.css";

function Read() {
  const { items, loading, error } = useFetchAllItems();

  if (loading) return <div className="page">Chargement...</div>;
  if (error) return <div className="page error">Erreur: {error.message}</div>;

  return (
    <div className="page">
      <h1>Tous les Items</h1>
      {items.length === 0 ? (
        <p>Aucun item trouvé. Créez-en un !</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div className="card" key={index}>
              <h2>{item.title}</h2>
              <p>{item.article}</p>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Read;
