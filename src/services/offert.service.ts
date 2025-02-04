import { HttpException } from "../exceptions/HttpException2";
import { PrismaClient, Offert } from "@prisma/client";


const prisma = new PrismaClient()

export class OffertService {

    static async getById(id: number) {
        const findOffert = await prisma.offert.findUnique({ where: { id } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')
        return findOffert
    }

    static async getAll(title: string = '') {
        return await prisma.offert.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        })
    }

    static async create(idUser: number, offert: Offert) {
        const findOffert = await prisma.user.findUnique({ where: { id: offert.id } })

        if (findOffert) throw new HttpException(409, 'Offert already exists')

        return await prisma.offert.create({
            data: {
                ...offert,
                idUserCreator: idUser
            },
        })
    }
    static async update(id: number, findOffert: Offert) {
        return await prisma.offert.update({
            where: { id },
            data: {
                ...findOffert,
            }
        })
    }

    static async delete(id: number) {

        const findOffert = await prisma.offert.findUnique({ where: { id } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')

        return await prisma.offert.delete({ where: { id } })

    }

    static async rate(idOffert: number, rate: number, user: number) {
        const findOffert = await prisma.offert.findUnique({ where: { id: idOffert } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')
        return await prisma.rate.create({
            data: {
                value: rate,
                idOffert: idOffert,
                idUser: user
            }
        })
    }

    static async getRate(idOffert: number) {
        const findOffert = await prisma.offert.findUnique({ where: { id: idOffert } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')
        const rate = await prisma.rate.findMany({ where: { idOffert } })
        const sum = rate.reduce((acc, curr) => acc + curr.value, 0)
        return sum / rate.length
    }
}