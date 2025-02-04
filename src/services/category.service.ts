import { HttpException } from "../exceptions/HttpException2";
import { PrismaClient, Category } from "@prisma/client";


const prisma = new PrismaClient()

export class CategoryService {
    static async getAll() {
        return await prisma.category.findMany()
    }

    static async create(Category: Category) {
        const findCategory = await prisma.user.findUnique({ where: { id: Category.id } })

        if (findCategory) throw new HttpException(409, 'Category already exists')

        return await prisma.category.create({
            data: {
                ...Category,
            }
        })
    }
    static async delete(id: number) {

        const findCategory = await prisma.category.findUnique({ where: { id } })
        if (!findCategory) throw new HttpException(404, 'Category not found')

        return await prisma.category.delete({ where: { id } })

    }
}