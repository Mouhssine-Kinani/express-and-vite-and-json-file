import express from "express";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes des items
app.use("/items", itemRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur est démarré et écoute sur http://localhost:${PORT}`);
});
