import { getRepository } from "typeorm";
import { Tasks } from "../entities/Tasks";
import ITask from "../interfaces/ITask";
import IUserPayload from "../interfaces/ITaskPayload";

export default class TasksRepository {
  /**
   * @param  {IUserPayload} taskInfo
   * @returns Promise
   */
  public async save(taskInfo: IUserPayload): Promise<ITask> {
    try {
      const taskRepository = getRepository(Tasks);
      const task = new Tasks();
      const createdTask: ITask = await taskRepository.save({
        ...task,
        ...taskInfo,
      });
      return createdTask;
    } catch (error) {
      console.log("create task Error : ", error)
      throw error;
    }
  }
  /**
   * @param  {number} id
   */
  public async find(id: number) {
    try {
      return await Tasks.findOne(id);
    } catch (error) {
      throw error;
    }
  }
  /**
   * @param  {any} query
   * @param  {string} action
   */
  public async update(task:Tasks, query: any, action: string) {
    switch (action) {
      case 'changeStatus':
        task.status = query.status
        break;
      case 'assign':
        task.assignee = query.assignee;
        break;
      default:
        break;
    }
    try {
      return await task.save();
    } catch (error) {
      throw error
    }
  }
}