import { Router } from "express";
import {UserController} from '../controlers/user.controller';
import {isAuthenticate} from '../middlewares/auth.middleware';

const router = Router()


router.get('/profile', isAuthenticate, UserController.profile)

// Crea el endpoint que liste todos los usuario de la web
// A este endpoint solo se puede acceder si el usuario es administrador
// Crer rutas, servicios, controllers, middlewares y modelos necesarios



export default router