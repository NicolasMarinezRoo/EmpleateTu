import { Router } from "express";
import {OffertController} from '../controlers/offert.controller';
import { isAuthenticate } from "@/middlewares/auth.middleware";

const router = Router()

router.get('/', OffertController.getAll)
router.get('/:id',  OffertController.getById)
router.post('/',  isAuthenticate, OffertController.create)
router.delete('/:id',  OffertController.delete)
router.put('/:id',  OffertController.update)

router.post('/:id/rate', isAuthenticate, OffertController.rate)
router.get('/:id/rate', isAuthenticate, OffertController.getRate)

export default router