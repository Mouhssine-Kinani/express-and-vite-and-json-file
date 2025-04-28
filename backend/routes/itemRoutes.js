import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const itemRoutes = Router();

// Routes pour les items
itemRoutes.get("/", getAllItems);
itemRoutes.get("/:id", getItemById);
itemRoutes.post("/create", createItem);
itemRoutes.put("/:id", updateItem);
itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;
