import { Router } from "express";
import ReaderController from "../controllers/ReaderController";

const leitorRoutes = Router();
const readerController = new ReaderController();

leitorRoutes.post("/", readerController.create);
leitorRoutes.get("/", readerController.getAll);
leitorRoutes.get("/buscar/:id", readerController.getById);
leitorRoutes.put("/:id", readerController.update);
leitorRoutes.delete("/:id", readerController.delete);
leitorRoutes.patch("/activate/:id", readerController.enable);
leitorRoutes.patch("/:id", readerController.disable);
leitorRoutes.get("/birthday", readerController.getBirthdaysThisMonth);

export default leitorRoutes;