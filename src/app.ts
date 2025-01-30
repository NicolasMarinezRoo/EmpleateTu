import express, {Response, Request} from "express";
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import offertRouter from "./routes/offert.routes"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(cookieParser())

//Security
app.use(helmet())
app.use(compression())

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 15 * 1000,
})
app.use(limiter)

//Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/oferts', offertRouter)

app.get('/', (rec:Request, res: Response) => {
    res.send('Bienvendio al backend (api rest)')
})

export default app