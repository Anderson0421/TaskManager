import axios from "axios"
import { TaskType } from '../types/type.d'

// Primero definimos nuestro API_URL por defecto para despues definir los diferentes
// Metodos que vamos a utilizar ya sea GET, POST, PUT O DELETE.

const API_URL = axios.create({
    baseURL: "http://localhost:8000/tasks"
})

// Aca creamos un funcion async con la res que sera el API_URL .GET ya que nuestra 
// solicitud aqui sera de GET, finalmente retornamos la data de la respuesta.

export const ListTasks = async () => {
    const res = await API_URL.get('/')
    return res.data
}

export const CreateTask = async (task: TaskType) => {
    await API_URL.post('/', task)
}

export const ChangeStateTask = async (task: TaskType) => {
    const res = await API_URL.put(`/${task.id}/`, task) // Ajustar la URL
    return res.data
}

// siempre el id es para eliminar un objeto
export const DeleteTask = async (id: number) => {
    const res = await API_URL.delete(`${id}/`)
    return res.data
}