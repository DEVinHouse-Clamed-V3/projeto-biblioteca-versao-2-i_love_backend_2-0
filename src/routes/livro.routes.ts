import { Router } from 'express';
import LivroController from "../controllers/LivroController";

const livroRoutes = Router();
const livroController = new LivroController();

livroRoutes.get("/", livroController.findAll); 
livroRoutes.get("/:id", livroController.findById);
livroRoutes.post("/", livroController.create);
livroRoutes.delete('/:id', livroController.delete);
livroRoutes.put('/:id', livroController.update);
livroRoutes.get("/ranking", livroController.findPageCountRanking);

export default livroRoutes;