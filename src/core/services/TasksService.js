import axios from "axios";
import { getLoggedUser } from './AuthService';
import { getAllUsers } from './UsersService';

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
export function getAllTasks() {
    return axios.get(`${apiUrl}/tasks`);
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
    const allTasks = (await getAllTasks()).data;

    return allTasks.filter(task => task.creatorId === creatorId);
}

/**
 * 
 * @param {taskData} taskData => new or existing task that should be saved
 */
export function saveTask(taskData) {
    if (taskData.id) {
        taskData.lastUpdated = new Date();
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }
    
    taskData = {
        ...taskData,
        creatorId: getLoggedUser().id,
        createdDate: new Date(),
        lastUpdated: new Date()
    };

    return axios.post(`${apiUrl}/tasks`, taskData);
}

/**
 * 
 * @param {id} id => the id of the task that should be deleted
 */
export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}