import { getAllTasks, getTaskById, addTask, deleteTask} from '../models/tasks.model.js';
import { validateTask } from '../../schemas/tasks.schema.js'
import { getParsedDate, isValidDate } from '../utils/date.utils.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: 'error al obtener las tareas'})
    }  
}

export const getTasksById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await getTaskById(id)

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task)
    } catch (error) {
        res.status(500).json({message: 'error al obtener la tarea'})
    }
    
}

export const addTasks = async (req, res) => {
    
        const { titulo, descripcion, fecha_creacion, fecha_vencimiento, estado } = req.body;

        const parsedFechaCreacion = getParsedDate(fecha_creacion)
        const parsedFechaVencimiento = getParsedDate(fecha_vencimiento)

        if (!isValidDate(parsedFechaCreacion) || !isValidDate(parsedFechaVencimiento)) {
            return res.status(400).json({ error: 'Fechas inválidas' });
        }
        
        const newTask = { titulo, descripcion, fecha_creacion: parsedFechaCreacion, fecha_vencimiento: parsedFechaVencimiento, estado };

        const result = validateTask(newTask)
        if (result.error) {
            return res.status(400).json({ error: result.error.errors });
        }  

        try {
            const newTaskId = await addTask(newTask)
            res.status(201).json({
                message: 'Tarea creada exitosamente',
                id: newTaskId,
                ...newTask
            }) 
        } catch (error) {
            res.status(404).json({ message: 'Error al añadir la tarea' })
        }
    } 

export const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteTask(id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'No se encontro la tarea'
            }) 
        } 
        res.status(204).json({ message: 'Tarea eliminada exitosamente' });

    } catch (error) {
        res.status(500).json({message: 'error al eliminar la tarea'})
    }
} 
