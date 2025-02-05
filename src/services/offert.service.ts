import { HttpException } from "../exceptions/HttpException2";
import { Offert } from "@prisma/client";
import { prisma } from "../database/database";



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
        console.log("creando ", idUser)
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

    static async rate(idOffert: number, value: number, idUser: number) {
        const findOffert = await prisma.offert.findUnique({ where: { id: idOffert } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')

        if(value < 0 || value > 5) throw new HttpException(400, 'Rate value must be between 0 and 5')

        await prisma.rate.upsert({
            where: {
                idUser_idOffert: {
                    idUser, idOffert
                }
            },
            update: {
                value
            },
            create: {
                idUser, idOffert, value
            }
        })
    }

    static async getRate(idOffert: number) {
        const raingStats = await prisma.rate.aggregate({
            where: {idOffert},
            _avg: {value: true},
            _count: { value: true }
        })
        return {
            totalRatings: raingStats._count.value,
            averateRating: raingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idOffert:number, idUser:number){
        const findOffert = await prisma.offert.findUnique({ where: { id: idOffert } })
        if (!findOffert) throw new HttpException(404, 'Offert not found')

        return await prisma.rate.findUnique({
            where:{
               idUser_idOffert:{idOffert, idUser}
            },
            select:{
                value:true
            }
        })
    }
}