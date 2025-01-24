import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { Response, Request } from 'express';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const userData = req.body
            const newUser = await AuthService.register(userData)
            res.status(201).json({ message: 'User register successfully', newUser })
        } catch (error) {
            res.status(409).json({ message: 'Fallo al registrar al usuario' + error })
        }
    }
    static async login(req: Request, res: Response) {
        try {
            const userData = req.body
            // Validar el body
            const token = await AuthService.login(userData.email, userData.password)
            res.cookie('token', token, { 
                maxAge: 60 * 60 * 1000,  //1 hora de caducidad
                httpOnly: true,  //No se puede acceder mediante js
                secure: false,  //Solo funciona en https
                sameSite: 'strict' //Solo se envia si es una peticion del mismo sitio
            })
            res.status(201).json({ message: 'Login successfully: ', token })
        } catch (error) {
            res.status(409).json({ message: 'Fallo al loguearse al usuario' })
        }
    }
}

