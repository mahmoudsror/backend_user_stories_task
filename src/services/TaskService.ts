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
       const result:ITask =  await this.tasksRepo.save(taskInfo);
       const historyObject = this.prepareTaskHistory(result);
       await this.taskHistoryRepo.save(historyObject)

       return result;
    }
    /**
     * @param  {ITask} taskInfo
     */
    private prepareTaskHistory(taskInfo:ITask){
        return {
            task: taskInfo.id,
            user: 1,
            status:taskInfo.status,
            action: 'create',
        }
    }
}