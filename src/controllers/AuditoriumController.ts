import { NextFunction, Request, Response, Router } from 'express';
import Auditorio from '../entities/Auditorio';
import { AppDataSource } from '../database/data-source';
import AppError from "../utils/AppError";
import handleError from "../middlewares/handleError";

class AuditoriumController {
    private auditorioRepository;

    constructor(){
        this.auditorioRepository = AppDataSource.getRepository(Auditorio);
    }


getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);
        const listaAuditorios = await auditorioRepository.find({});
        res.status(200).json(listaAuditorios);
    } catch (erro) {
        next(erro);
    }
};


getConceitos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);

        const auditórios = await auditorioRepository
            .createQueryBuilder("auditorium")
            .where("auditorium.capacity >= :capacity", { capacity: 300 })
            .andWhere("auditorium.has_projector = :hasProjector", { hasProjector: true })
            .andWhere("auditorium.has_sound_system = :hasSoundSystem", { hasSoundSystem: true })
            .getMany();

        res.json(auditórios);
    } catch (erro) {
        next(erro);
    }
};


getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);
        const auditorio = await auditorioRepository.findOne({ where: { id: Number(id) } });

        if (!auditorio) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        res.status(200).json(auditorio);
    } catch (error) {
        next(error);
    }
};


create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const auditorio = new Auditorio();
    auditorio.name = body.name;
    auditorio.capacity = body.capacity;
    auditorio.location = body.location;
    auditorio.has_projector = true;
    auditorio.has_projector = true;
    auditorio.createdAt = new Date();
    auditorio.updatedAt = new Date();

    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);
        const novoAuditorio = await auditorioRepository.save(auditorio);
        res.status(201).json({ message: "Auditório criado com sucesso", auditorio: novoAuditorio });
    } catch (error) {
        next(error);
    }
};


update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, capacity, location } = req.body;

    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);
        const auditorio = await auditorioRepository.findOne({ where: { id: Number(id) } });

        if (!auditorio) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        auditorio.name = name ?? auditorio.name;
        auditorio.capacity = capacity ?? auditorio.capacity;
        auditorio.location = location ?? auditorio.location;

        const auditorioAtualizado = await auditorioRepository.save(auditorio);
        res.status(200).json({ message: "Auditório atualizado com sucesso", auditorio: auditorioAtualizado });
    } catch (error) {
        next(error);
    }
};


delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const auditorioRepository = AppDataSource.getRepository(Auditorio);
        const auditorio = await auditorioRepository.findOne({ where: { id: Number(id) } });

        if (!auditorio) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        await auditorioRepository.remove(auditorio);
        res.status(200).json({ message: "Auditórior excluído com sucesso" });
    } catch (error) {
        next(error);
    }
};

}

export default AuditoriumController;