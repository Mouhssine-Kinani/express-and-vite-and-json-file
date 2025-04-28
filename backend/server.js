import express from "express";
import { PORT } from "./config/env.js";
import itemRoutes from "./routes/itemRoutes.js";
import connectDB from "./config/db.js";
import { promises as fsPromises } from "fs";
import path from "path";
import Item from "./models/Item.js";

// Connexion à MongoDB
connectDB();

// Initialisation des données depuis data.json
const initializeData = async () => {
  try {
    // Vérifier s'il y a déjà des données dans la collection
    const count = await Item.countDocuments();

    if (count === 0) {
      // Lire les données depuis data.json
      const dataPath = path.join(process.cwd(), "data.json");
      const jsonData = await fsPromises.readFile(dataPath, "utf8");
      const items = JSON.parse(jsonData);

      // Insérer les données dans MongoDB
      await Item.insertMany(items);
      console.log("Données initiales importées avec succès");
    } else {
      console.log("La base de données contient déjà des données");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des données:", error);
  }
};

// Appel de la fonction d'initialisation
initializeData();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration CORS manuelle (aucun package supplémentaire requis)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Utiliser les routes des items
app.use("/items", itemRoutes);

// Démarrer le serveur
app.listen(PORT || 3000, () => {
  console.log(
    `Le serveur est démarré et écoute sur http://localhost:${PORT || 3000}`
  );
});
