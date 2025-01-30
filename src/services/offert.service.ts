import { PrismaClient, Offert, User } from "@prisma/client";

import { HttpException } from "../exceptions/HttpException";

const prisma = new PrismaClient()

export class OffertService {

    static async getById(id: number) {
        const findOffert = await prisma.offert.findUnique({ where: { id } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')
        return findOffert
    }

    static async getAll() {
        return await prisma.offert.findMany()
    }

    static async create(offert: Offert) {
        const findOffert = await prisma.user.findUnique({ where: { id: offert.id } })

        if (findOffert) throw new HttpException(409, 'Offert already exists')

        return await prisma.offert.create({
            data: {
                ...offert,
            }
        })
    }
    static async update(id: number) {
    
        const findOffert = await prisma.offert.findUnique({ where: { id } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')
        return await prisma.offert.update({
            where: {id},
            data: {
                ...findOffert,
            }
        })
    
    }
    static async delete(id: number) {
    
        const findOffert = await prisma.offert.findUnique({ where: { id } })
        if(!findOffert) throw new HttpException(404, 'Offert not found')

        return await prisma.offert.delete({where:{id}})
    
    }

    static async rate(idOffert: number, rate: number, user:number) {
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
        const rate = await prisma.rate.findMany({where:{idOffert}})
        const sum = rate.reduce((acc, curr) => acc + curr.value, 0)
        return sum / rate.length
    }
}