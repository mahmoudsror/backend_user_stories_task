import { getRepository } from "typeorm";
import { TasksHistory } from "../entities/TasksHistory";
import ITaskHistory from "../interfaces/ITaskHistory";

export default class TaskHistoryRepository {
  /**
   * @param  {ITaskHistory} history
   */
  public async save(history: ITaskHistory) {
    const taskHistoryRepository = getRepository(TasksHistory);
    const taskHistory = new TasksHistory();
    return taskHistoryRepository.save({
      ...taskHistory,
      ...history,
    });
  }
}