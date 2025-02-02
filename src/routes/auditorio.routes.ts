import { Router } from 'express';
import AuditoriumController from '../controllers/AuditoriumController';

const auditorioRoutes = Router();
const auditoriumController = new AuditoriumController();

auditorioRoutes.get('/', auditoriumController.getAll);
auditorioRoutes.get('/conceitos', auditoriumController.getConceitos);
auditorioRoutes.get('/:id', auditoriumController.getById);
auditorioRoutes.post('/', auditoriumController.create);
auditorioRoutes.put('/:id', auditoriumController.update);
auditorioRoutes.delete('/:id', auditoriumController.delete);

export default auditorioRoutes;