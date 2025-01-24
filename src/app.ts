import express, {Response, Request} from "express";
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())

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

app.get('/', (rec:Request, res: Response) => {
    res.send('Bienvendio al backend (api rest)')
})

export default app