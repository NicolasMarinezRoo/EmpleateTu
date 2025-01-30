import { Router } from "express";
import {OffertController} from '../controlers/offert.controller';

const router = Router()

router.get('/', OffertController.getAll)
router.get('/:id', OffertController.getById)
router.post('/',OffertController.create)
router.delete('/:id',OffertController.delete)
router.put('/:id',OffertController.update)

router.post('/:id/rate', OffertController.rate)
router.get('/:id/rate', OffertController.getRate)

export default router