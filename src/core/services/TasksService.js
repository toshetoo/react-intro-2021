import axios from "axios";
import { getLoggedUser } from './AuthService';

const apiUrl = 'http://localhost:3000';

export const TaskStatus = {
    New: 'New',
    InProgress: 'In Progress',
    InReview: 'In Review',
    Done: 'Done'
};


/**
 * 
 * @returns a collection of tasks
 */
export async function getAllTasks(searchParam) {
    const allTasks = (await axios.get(`${apiUrl}/tasks`)).data;

    if(!searchParam) 
        return allTasks;

    searchParam = searchParam.toLowerCase();

    return allTasks.filter(task => task.title.toLowerCase().includes(searchParam) || task.description.toLowerCase().includes(searchParam));

}

/**
 * 
 * @param {id} id => the id of the task 
 * @returns a single task
 */
export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}

/**
 * 
 * @param {creatorId} creatorId => the ID of the user that created the tasks
 * @returns a list of tasks
 */
export async function getTasksByCreatorId(creatorId) {
    const allTasks = await getAllTasks();

    return allTasks.filter(task => task.creatorId === creatorId);
}

/**
 * 
 * @param {taskData} taskData => new or existing task that should be saved
 */
export async function saveTask(updatedTask) {
    if (updatedTask.id) {
        const originalTask = (await getTaskById(updatedTask.id)).data;

        const keys = Object.keys(originalTask);
        const skippedFields = ['id', 'history', 'creatorId'];
        for(let i=0; i < keys.length; i++) {
            const currentProperty = keys[i];
            if (skippedFields.includes(currentProperty))
                continue;


            if (originalTask[currentProperty] !== updatedTask[currentProperty]) {
               
                updatedTask.history.push({
                    changedBy: getLoggedUser().name,
                    changedProperty: currentProperty,
                    oldValue: originalTask[currentProperty],
                    newValue: updatedTask[currentProperty]
                });
            }
        }

        updatedTask.lastUpdated = new Date().toDateString();
        return axios.put(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask);
    }
    
    updatedTask = {
        ...updatedTask,
        creatorId: getLoggedUser().id,
        createdDate: new Date().toDateString(),
        lastUpdated: new Date().toDateString(),
        history: []
    };

    return axios.post(`${apiUrl}/tasks`, updatedTask);
}

/**
 * 
 * @param {id} id => the id of the task that should be deleted
 */
export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}