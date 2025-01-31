import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const handleError = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ error: error.message });
        return;
    }

    console.error(error);

    response.status(500).json({ error: "Internal server error" });
    return;
}

export default handleError;