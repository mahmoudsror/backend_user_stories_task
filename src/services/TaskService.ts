import ITask from "../interfaces/ITask";
import ITaskPayload from "../interfaces/ITaskPayload";
import TaskHistoryRepository from "../repositories/TaskHistoryRepository";
import TasksRepository from "../repositories/TasksRepository";
import UserRepository from '../repositories/UsersRepository'
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
            const historyObject = await this.prepareTaskHistory(result);
            this.taskHistoryRepo.save(historyObject)
     
            return result;
        } catch (error) {
            console.log("Create task error : ", error)
            throw error;
        }
    }

    /**
     * @param  {ITask} taskInfo
     */
    private async prepareTaskHistory(taskInfo:ITask){
        const userRepo = new UserRepository();
        const user = await userRepo.save();
        return {
            task: taskInfo.id,
            user: user.id, 
            status:taskInfo.status,
            action: 'create',
        }
    }
}