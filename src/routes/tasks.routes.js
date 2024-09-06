import { Router } from "express";
import { addTasks, deleteTasks, getTasks, getTasksById } from "../controller/tasks.controller.js";

const router = Router()

router.get('/tareas', getTasks)
router.get('/tareas/:id', getTasksById)
router.post('/tareas', addTasks)
router.delete('/tareas/:id', deleteTasks)

export default router