import pool from '../../config/tasks.db.js'

async function getAllTasks() {
    try {
        const [result] = await pool.query('SELECT * FROM tareas;');
        return result;
    } catch (error) {
        throw new Error('Error al obtener tareas');
    }
}

async function getTaskById(id) {
    const [result] = await pool.query('SELECT * FROM tareas WHERE id = ?;', [id]);
    return result[0]
}

async function addTask(taskData) {
    const [rows] = await pool.query(
        'INSERT INTO tareas (titulo, descripcion, fecha_creacion, fecha_vencimiento, estado) VALUES (?, ?, ?, ?, ?);',
        [taskData.titulo, taskData.descripcion, taskData.fecha_creacion, taskData.fecha_vencimiento, taskData.estado]
    )
    return rows.insertId
}

async function deleteTask(id) {
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?;', [id])
    return result
}

export {getAllTasks, getTaskById, addTask, deleteTask}