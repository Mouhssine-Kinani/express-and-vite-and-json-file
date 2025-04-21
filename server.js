import express from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000; // Utilise le port défini dans .env ou 3000 par défaut
const DATA_FILE = path.join(process.cwd(), "data.json");

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Initialiser le fichier data.json s'il n'existe pas
async function initDataFile() {
  try {
    await fsPromises.access(DATA_FILE);
  } catch (error) {
    // Le fichier n'existe pas, on le crée avec un tableau vide
    await fsPromises.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
    console.log("Fichier data.json initialisé avec un tableau vide");
  }
}

// Fonction pour lire les données du fichier JSON
async function readData() {
  try {
    const data = await fsPromises.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    return [];
  }
}

// Fonction pour écrire les données dans le fichier JSON
async function writeData(data) {
  try {
    await fsPromises.writeFile(
      DATA_FILE,
      JSON.stringify(data, null, 2),
      "utf8"
    );
    return true;
  } catch (error) {
    console.error("Erreur lors de l'écriture dans le fichier:", error);
    return false;
  }
}

// Route GET pour récupérer tous les items
app.get("/items", async (req, res) => {
  try {
    const items = await readData();
    res.json(items);
  } catch (error) {
    console.error("Erreur GET /items:", error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
});

// Route GET pour récupérer un item par son ID
app.get("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const item = items.find((item) => item.id === id);

    if (!item) {
      return res
        .status(404)
        .json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    res.json(item);
  } catch (error) {
    console.error(`Erreur GET /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
});

// Route POST pour créer un nouvel item
app.post("/items", async (req, res) => {
  try {
    const items = await readData();
    const newItemId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

    const newItem = {
      id: newItemId,
      ...req.body,
    };

    items.push(newItem);
    const success = await writeData(items);

    if (success) {
      res.status(201).json(newItem);
    } else {
      res
        .status(500)
        .json({ error: "Impossible d'enregistrer le nouvel item." });
    }
  } catch (error) {
    console.error("Erreur POST /items:", error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
});

// Route PUT pour mettre à jour un item existant
app.put("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    // Mettre à jour l'item en conservant son ID
    const updatedItem = {
      id,
      ...req.body,
    };

    items[itemIndex] = updatedItem;
    const success = await writeData(items);

    if (success) {
      res.json(updatedItem);
    } else {
      res.status(500).json({ error: "Impossible de mettre à jour l'item." });
    }
  } catch (error) {
    console.error(`Erreur PUT /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
});

// Route DELETE pour supprimer un item
app.delete("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    // Supprimer l'item du tableau
    const deletedItem = items.splice(itemIndex, 1)[0];
    const success = await writeData(items);

    if (success) {
      res.json({ message: "Item supprimé avec succès", item: deletedItem });
    } else {
      res.status(500).json({ error: "Impossible de supprimer l'item." });
    }
  } catch (error) {
    console.error(`Erreur DELETE /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
});

// Démarrer le serveur
initDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Le serveur est démarré et écoute sur http://localhost:${PORT}`
    );
  });
});
