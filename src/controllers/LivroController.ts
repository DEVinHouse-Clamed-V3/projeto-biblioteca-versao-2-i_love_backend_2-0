import e, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import  Livro  from "../entities/Livro";
import  AppError  from "../utils/AppError";

class LivroController {
  private livroRepository;

  constructor() {
    this.livroRepository = AppDataSource.getRepository(Livro);
  } 

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);
      const {
        title,
        description,
        publication_date,
        isbn,
        page_count,
        language,
      } = req.body;

      const livro = livroRepository.create({
        title,
        description,
        publication_date,
        isbn,
        page_count,
        language,
      });

      await livroRepository.save(livro);
      return res.status(201).json(livro);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);
      const livros = await livroRepository.find({});

      return res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);
      const { id } = req.params;

      const livro = await livroRepository.findOne({
        where: { id: Number(id) },
      });

      if (!livro) {
        throw new AppError("Livro not found", 404);
      }

      return res.json(livro);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);
      const { id } = req.params;
      const {
        title,
        description,
        publication_date,
        isbn,
        page_count,
        language,
      } = req.body;

      const livro = await livroRepository.findOne({
        where: { id: Number(id) },
      });

      if (!livro) {
        throw new AppError("Livro not found", 404);
      }

      livro.title = title ?? livro.title;
      livro.description = description ?? livro.description;
      livro.publication_date = publication_date ?? livro.publication_date;
      livro.isbn = isbn ?? livro.isbn;
      livro.page_count = page_count ?? livro.page_count;
      livro.language = language ?? livro.language;

      await livroRepository.save(livro);

      return res.status(201).json(livro);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const livroRepository = AppDataSource.getRepository(Livro);
    const { id } = req.params;

    const livro = await livroRepository.findOne({ where: { id: Number(id) } });

    if (!livro) {
      throw new AppError("Livro not found", 404);
    }

    await livroRepository.remove(livro);

    return res.status(200).send();
  }

  async findPageCountRanking(req: Request, res: Response, next: NextFunction) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);

      const livros = await livroRepository
        .createQueryBuilder("livro")
        .orderBy("livro.page_count", "DESC")
        .limit(3)
        .getMany();

      return res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;