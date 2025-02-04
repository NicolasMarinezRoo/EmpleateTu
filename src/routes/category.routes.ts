import { Router } from "express";
import {OffertController} from '../controlers/offert.controller';

const router = Router()

router.get('/', OffertController.getAll)
router.post('/', OffertController.create)
router.delete('/:id',OffertController.delete)
export default router