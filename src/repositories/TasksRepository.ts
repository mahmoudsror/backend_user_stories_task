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
}