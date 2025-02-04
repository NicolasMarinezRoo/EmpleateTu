import { CategoryService } from '../services/category.service';
import { Response, Request, NextFunction } from 'express';
export class OffertController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const Category = await CategoryService.getAll()
            res.status(200).json(Category)

        } catch (error) {
            next(error)
        }

    }
    static async create(req: Request, res: Response, next: NextFunction) {

        const CategoryData = req.body
        try {
            const newCategory = await CategoryService.create(CategoryData)
            res.status(201).json(newCategory)
        } catch (error) {
            next(error)
        }

    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const Category = await CategoryService.delete(id)
            res.status(200).json(Category

            )

        } catch (error) {
            next(error)
        }
    }
}