import express, { Router } from 'express';
import EncurtadorController from '../controllers/encurtadorController';

const router = Router();
const encurtadorController = new EncurtadorController();

router.post('/', encurtadorController.save);

export default router;