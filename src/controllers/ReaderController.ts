import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Leitor from "../entities/Leitor";
import AppError from "../utils/AppError";
import handleError from "../middlewares/handleError";

class ReaderController {
  private readerRepository;

  constructor() {
    this.readerRepository = AppDataSource.getRepository(Leitor);
  }

  // Método para criar um novo leitor
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone_number, birthdate, address } = req.body;

      if (!name || !email || !phone_number || !birthdate || !address) {
        throw new AppError("Todos os campos são obrigatórios", 400);
      }

      const reader = await this.readerRepository.save(req.body);
      res.status(201).json(reader);
    } catch (error) {
      next(error);
    }
  };

  // Método para listar todos os leitores permitindo filtro por nome
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const nameFilter = query.name ? `%${String(query.name)}%` : undefined;

        const readers = await this.readerRepository.createQueryBuilder("reader")
            .where(nameFilter ? "reader.name ILIKE :name" : "1=1", { name: nameFilter })
            .getMany();

        res.json(readers);
    } catch (error) {
        next(error);
    }
};

  // Método para buscar um leitor pelo ID
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reader = await this.readerRepository.findOneBy({
        id: parseInt(id),
      });

      if (!reader) {
        throw new AppError("Leitor não encontrado", 404);
      }

      res.json(reader);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar um leitor
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const reader = await this.readerRepository.findOneBy({
        id: parseInt(id),
      });

      if (!reader) {
        throw new AppError("Leitor não encontrado", 404);
      }

      Object.assign(reader, body);
      await this.readerRepository.save(reader);

      res.json(reader);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar um leitor
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reader = await this.readerRepository.findOneBy({
        id: parseInt(id),
      });

      if (!reader) {
        throw new AppError("Leitor não encontrado", 404);
      }

      await this.readerRepository.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  };

  // Método para desativar um leitor
  disable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reader = await this.readerRepository.findOneBy({
        id: parseInt(id),
      });

      if (!reader) {
        throw new AppError("Leitor não encontrado", 404);
      }

      reader.active = false;
      await this.readerRepository.save(reader);

      res.json(reader);
    } catch (error) {
      next(error);
    }
  };

  // Método para ativar um leitor
  enable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reader = await this.readerRepository.findOneBy({
        id: parseInt(id),
      });

      if (!reader) {
        throw new AppError("Leitor não encontrado", 404);
      }

      reader.active = true;
      await this.readerRepository.save(reader);

      res.json(reader);
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar os aniversariantes do mês
  getBirthdays = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const readers = await this.readerRepository
        .createQueryBuilder("reader")
        .where("EXTRACT(MONTH FROM reader.birthdate) = :month", {
          month: currentMonth,
        })
        .getMany();

      res.json(readers);
    } catch (error) {
      next(error);
    }
  };
}

export default ReaderController;
