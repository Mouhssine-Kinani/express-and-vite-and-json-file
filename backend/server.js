import express from "express";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
app.listen(PORT, () => {
  console.log(`Le serveur est démarré et écoute sur http://localhost:${PORT}`);
});
