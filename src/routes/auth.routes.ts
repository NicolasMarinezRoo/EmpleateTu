import { Router } from "express";
import {AuthController} from '@/controlers/auth.controller';

const router = Router()

router.post('/login', AuthController.login)
//router.post('/logout', AuthController.logout)
router.post('/register', AuthController.register)


export default router