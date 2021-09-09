import ITask from "../interfaces/ITask";
import ITaskPayload from "../interfaces/ITaskPayload";
import TaskHistoryRepository from "../repositories/TaskHistoryRepository";
import TasksRepository from "../repositories/TasksRepository";
export class TaskSerivce {

    private tasksRepo:TasksRepository;
    private taskHistoryRepo: TaskHistoryRepository;

    constructor(taskRepo: TasksRepository, taskHistoryRepo:TaskHistoryRepository){
        this.tasksRepo = taskRepo;
        this.taskHistoryRepo = taskHistoryRepo;
    }
    
    /**
     * @param  {ITaskPayload} taskInfo
     */
    public async createTask(taskInfo:ITaskPayload){
        try {
            const result:ITask =  await this.tasksRepo.save(taskInfo);
            const historyObject = this.prepareTaskHistory(result);
            await this.taskHistoryRepo.save(historyObject)
     
            return result;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @param  {ITask} taskInfo
     */
    private prepareTaskHistory(taskInfo:ITask){
        return {
            task: taskInfo.id,
            user: taskInfo.id, // temp value for user id just in develop 
            status:taskInfo.status,
            action: 'create',
        }
    }
}