import { Router } from "express";
import {UserController} from '../controlers/user.controller';
import {isAdmin, isAuthenticate} from '../middlewares/auth.middleware';
import { Prisma } from "@prisma/client";

const router = Router()


router.get('/profile', isAuthenticate, UserController.profile)
router.get('/', isAuthenticate, isAdmin, UserController.profile)

// Crea el endpoint que liste todos los usuario de la web
// A este endpoint solo se puede acceder si el usuario es administrador
// Crer rutas, servicios, controllers, middlewares y modelos necesarios



export default router