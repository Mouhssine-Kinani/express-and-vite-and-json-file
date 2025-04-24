import { promises as fsPromises } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data.json");

// Initialiser le fichier data.json
async function initDataFile() {
  try {
    await fsPromises.access(DATA_FILE);
  } catch (error) {
    await fsPromises.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
    console.log("Fichier data.json initialisé avec un tableau vide");
  }
}

// Lire les données
async function readData() {
  try {
    const data = await fsPromises.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    return [];
  }
}

// Écrire les données
async function writeData(data) {
  try {
    await fsPromises.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'écriture dans le fichier:", error);
    return false;
  }
}

// Obtenir tous les items
export async function getAllItems(req, res) {
  try {
    const items = await readData();
    res.json(items);
  } catch (error) {
    console.error("Erreur GET /items:", error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}

// Obtenir un item par ID
export async function getItemById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const item = items.find((item) => item.id === id);

    if (!item) {
      return res.status(404).json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    res.json(item);
  } catch (error) {
    console.error(`Erreur GET /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}

// Créer un nouvel item
export async function createItem(req, res) {
  try {
    const items = await readData();
    const newItemId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

    const newItem = {
      id: newItemId,
      ...req.body,
    };

    items.push(newItem);
    const success = await writeData(items);

    if (success) {
      res.status(201).json(newItem);
    } else {
      res.status(500).json({ error: "Impossible d'enregistrer le nouvel item." });
    }
  } catch (error) {
    console.error("Erreur POST /items:", error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}

// Mettre à jour un item
export async function updateItem(req, res) {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

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
}

// Supprimer un item
export async function deleteItem(req, res) {
  try {
    const id = parseInt(req.params.id);
    const items = await readData();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

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
}

// Initialiser le fichier de données
initDataFile();