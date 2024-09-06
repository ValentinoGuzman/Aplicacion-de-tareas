import express from 'express'
import taskRouter from './routes/tasks.routes.js'

const app = express()

app.use(express.json())
app.use(taskRouter)


export default app