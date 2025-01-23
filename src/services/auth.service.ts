import { PrismaClient, User } from "@prisma/client";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

// Alta cohexion bajo acoplamiento

const prisma = new PrismaClient()
const token_password = process.env.TOKEN_PASSWORD || 'pass'
export class AuthService{
    static async register(user:User){
        // Ver si el usuario no existe 
        // Sentencia sql normal :'select * from users where email = user.email'
        const findUser = await prisma.user.findUnique({where:{email: user.email
            }})

        if(findUser) throw new Error(`User ${user.email} alredy exists`)

        // Encriptar el password
        const passwordEncrypted = await bcypt.hash(user.password, 10)        
        user.password = ''
        //Guardar el usuario en la bd
        return await prisma.user.create({
                data:{
                    ...user,
                    password: passwordEncrypted,
                    role: null
                },
                omit:{
                    password: true
                }
        })

    }

    static async login(email:string, password:string) {
            // Ver si el ususario existe
    
            const findUser = await prisma.user.findUnique({where:{email}})

            if(!findUser) throw new Error('Invalid user or password')
    
    
            // Ver si el password coincide
    
            const isPasswordCorrect = await bcypt.compare(password, findUser.password)      
            if(!isPasswordCorrect) throw new Error('Invalid user or password')

            // Generar el token de autenticacion

            const token = jwt.sign(
                {id:findUser.id, email:findUser.email, role: findUser.role}, 
                token_password,
                {expiresIn:"1h"}
            )

            // Devolver el token 
            return token
    }
   
}