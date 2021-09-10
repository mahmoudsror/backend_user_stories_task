import ITask from "../interfaces/ITask";
import ITaskPayload from "../interfaces/ITaskPayload";
import TaskHistoryRepository from "../repositories/TaskHistoryRepository";
import TasksRepository from "../repositories/TasksRepository";
export class TaskSerivce {

    private tasksRepo: TasksRepository;
    private taskHistoryRepo: TaskHistoryRepository;

    constructor(taskRepo: TasksRepository, taskHistoryRepo: TaskHistoryRepository) {
        this.tasksRepo = taskRepo;
        this.taskHistoryRepo = taskHistoryRepo;
    }

    /**
     * @param  {ITaskPayload} taskInfo
     */
    public async createTask(taskInfo: ITaskPayload) {
        try {
            const result: ITask = await this.tasksRepo.save(taskInfo);
            const historyObject = await this.prepareTaskHistory(result, 'create');
            this.taskHistoryRepo.save(historyObject)

            return result;
        } catch (error) {
            console.log("Create task error : ", error)
            throw error;
        }
    }
    /**
     * @param  {any} taskId
     * @param  {string} status
     */
    public async changeStatus(taskId: any, status: string) {

        const task = await this.tasksRepo.find(taskId);
        
        const isValidTransition = this.isValidTransition(task, status);
        if (!isValidTransition) {
            return {
                message: "Invalid status change"
            }
        }
        if(task){
            const historyObject = await this.prepareTaskHistory(task, 'changeStatus');
            this.taskHistoryRepo.save(historyObject)
            return await this.tasksRepo.update(task, { status }, 'changeStatus');
        }
        return {
            message:"Invalid task"
        }           

    }
    /**
     * @param  {number} assignee
     */
    public async assign(taskId:any, assignee: any) {
        const task = await this.tasksRepo.find(taskId);
        if(task){
            const historyObject = await this.prepareTaskHistory(task, 'assign');
            this.taskHistoryRepo.save(historyObject)
            return await this.tasksRepo.update(task, { assignee }, 'assign');
        }
            
        return {
            message: "Invalid task"
        }
    }


    /**
     * @param  {ITask} taskInfo
     */
    private async prepareTaskHistory(taskInfo: ITask, action:string) {

        return {
            task: taskInfo.id,
            user: taskInfo.createdBy,
            status: taskInfo.status,
            action: action,
        }
    }
    /**
     * @param  {any} task
     * @param  {string} newStatus
     */
    private isValidTransition(task: any, newStatus: string) {
        
        if ((task.status == 'todo' || task.status == "blocked") && newStatus == "inprogress") {
            return true;
        }
        if (task.status == "inprogress" && (newStatus == "blocked" || newStatus == "inqa")) {
            return true;
        }

        if (task.status == "inqa" && (newStatus == "todo" || newStatus == "done")) {
            return true;
        }

        if (task.status == "done" && newStatus == "deployed") {
            return true;
        }
        return false;
    }
}