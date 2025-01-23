import express, {Response, Request} from "express";
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"

const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get('/', (rec:Request, res: Response) => {
    res.send('Bienvendio al backend (api rest)')
})

export default app