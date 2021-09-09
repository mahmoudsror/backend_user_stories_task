import TaskHistoryRepository from "../repositories/TaskHistoryRepository";
import TasksRepository from "../repositories/TasksRepository";
import {TaskSerivce} from "../services/TaskService";

export interface Container {
    taskService: TaskSerivce
} 

export function createContainer():Container{
    const taskRepo = new TasksRepository();
    const historyRepo = new TaskHistoryRepository();
    const taskService = new TaskSerivce(taskRepo, historyRepo);
    return {
        taskService
    }
}