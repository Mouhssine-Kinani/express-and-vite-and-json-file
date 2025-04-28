import Item from "../models/Item.js";

// Obtenir tous les items
export async function getAllItems(req, res) {
  try {
    const items = await Item.find().sort({ id: 1 });
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
    const item = await Item.findOne({ id });

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
}

// Créer un nouvel item
export async function createItem(req, res) {
  try {
    const newItemId = await Item.getNextId();

    const newItem = new Item({
      id: newItemId,
      ...req.body,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Erreur POST /items:", error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}

// Mettre à jour un item
export async function updateItem(req, res) {
  try {
    const id = parseInt(req.params.id);
    const item = await Item.findOne({ id });

    if (!item) {
      return res
        .status(404)
        .json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    // Mettre à jour les champs
    item.title = req.body.title || item.title;
    item.article = req.body.article || item.article;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    console.error(`Erreur PUT /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}

// Supprimer un item
export async function deleteItem(req, res) {
  try {
    const id = parseInt(req.params.id);
    const item = await Item.findOne({ id });

    if (!item) {
      return res
        .status(404)
        .json({ error: `Item avec l'ID ${id} non trouvé.` });
    }

    const deletedItem = await Item.findOneAndDelete({ id });
    res.json({ message: "Item supprimé avec succès", item: deletedItem });
  } catch (error) {
    console.error(`Erreur DELETE /items/${req.params.id}:`, error);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur." });
  }
}
