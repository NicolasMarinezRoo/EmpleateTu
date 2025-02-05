import { Response, Request, NextFunction } from 'express';
import { OffertService } from '../services/offert.service';

export class OffertController {
    static async getById(req: Request, res: Response, next:NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            const offert = await OffertService.getById(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }

    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const offert = await OffertService.getAll()
            res.status(200).json(offert)
            
        }catch(error){
            next(error)
        }

    }
    static async create(req: Request, res: Response, next: NextFunction) {
        
        const offertData = req.body
        const user = req.user.id
        try {
            const newOffert = await OffertService.create(user, offertData)
            res.status(201).json(newOffert)
        } catch (error) {
            next(error)
        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const offertData = req.body
            const id = Number.parseInt(req.params.id)
            const offert = await OffertService.update(id, offertData)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            const offert = await OffertService.delete(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async rate(req: Request, res: Response, next: NextFunction) {
        
        const rate = req.body.value
        const user = req.cookies.token.id

        try {
            const id = Number.parseInt(req.params.id)
            await OffertService.rate(id, rate, user)
            res.status(200).json({message: 'Rate added'})
            
        } catch (error) {
            next(error)
        }
    }

    static async getRate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            const offert = await OffertService.getRate(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async getMyRate(req: Request, res: Response, next: NextFunction) {
        try {
            const idOffert = Number.parseInt(req.params.id)
            const idUser = req.cookies.token.id
            const offert = await OffertService.getMyRate(idOffert, idUser)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }
}

