import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const handleError = (error: any, request: Request, response: Response, next: NextFunction) => {
    console.error("Erro capturado pelo middleware", error);

    if (error instanceof AppError) {
        response.status(500).json({ error: "Erro interno do servidor" });
        return;
    }

    response.status(error.statusCode || 400).json({ error: error.message });
    return;
}

export default handleError;