import {User} from "@prisma/client";
import {prisma} from "../database/database";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";
import {HttpException} from "../exceptions/HttpException2";
// Alta cohexion bajo acoplamiento


const token_password = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService{
    static async register(user:User){
        // Ver si el usuario no existe 
        // Sentencia sql normal :'select * from users where email = user.email'
        const findUser = await prisma.user.findUnique({where:{email: user.email }})

        if(findUser) throw new HttpException(409, 'User already exists')

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
            if(!findUser) throw new HttpException(409 ,'Invalid user or password')
    
            // Ver si el password coincide
    
            const isPasswordCorrect = await bcypt.compare(password, findUser.password)      
            if(!isPasswordCorrect) throw new HttpException( 404 ,'Invalid user or password')

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