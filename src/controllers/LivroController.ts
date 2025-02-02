import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Livro } from "../entities/Livro";
import { AppError } from "../utils/AppError";

export class LivroController {
  private livroRepository;

  constructor() {
    this.livroRepository = AppDataSource.getRepository(Livro);

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.findPageCountRanking = this.findPageCountRanking.bind(this);
  }

  async create(req: Request, res: Response) {
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
      return res.status(500).json({ message: error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);
      const livros = await livroRepository.find({});

      return res.status(200).json(livros);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response) {
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
      return res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
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
      return res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
    const livroRepository = AppDataSource.getRepository(Livro);
    const { id } = req.params;

    const livro = await livroRepository.findOne({ where: { id: Number(id) } });

    if (!livro) {
      throw new AppError("Livro not found", 404);
    }

    await livroRepository.remove(livro);

    return res.status(200).send();
  }

  async findPageCountRanking(req: Request, res: Response) {
    try {
      const livroRepository = AppDataSource.getRepository(Livro);

      const livros = await livroRepository
        .createQueryBuilder("livro")
        .orderBy("livro.page_count", "DESC")
        .limit(3)
        .getMany();

      return res.status(200).json(livros);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
