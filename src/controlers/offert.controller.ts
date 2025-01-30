import { Response, Request, NextFunction } from 'express';
import { OffertService } from '../services/offert.service';

export class OffertController {
    static async getById(req: Request, res: Response, next:NextFunction) {
        try {
            const id = Number(req.params.id)
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
        try {
            const newOffert = await OffertService.create(offertData)
            res.status(201).json(newOffert)
        } catch (error) {
            next(error)
        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const offert = await OffertService.update(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const offert = await OffertService.delete(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async rate(req: Request, res: Response, next: NextFunction) {
        
        const rate = req.body.rate.value
        const user = req.body.user.id

        try {
            const id = Number(req.params.id)
            const offert = await OffertService.rate(id, rate, user)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }

    static async getRate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const offert = await OffertService.getRate(id)
            res.status(200).json(offert)
            
        } catch (error) {
            next(error)
        }
    }
}

