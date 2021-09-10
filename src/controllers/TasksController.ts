import { Request, Response } from 'express';
import { createContainer, Container } from '../Container/Container';
import ITask from '../interfaces/ITask';
export class TasksController {
    /**
     * @param  {Request} request
     * @param  {Response} response
     */
    public async create(request: Request, response: Response) {

        try {
            const container: Container = createContainer();
            const taskService = container.taskService;
            const body = request.body;
            const result:ITask = await taskService.createTask(body);
    
            return response.send({ status: 200, result });
        } catch (error) {
           return response.status(500).send({
               status:500,
               message:"internal server error"
            });
        }
    }

    /**
     * @param  {Request} request
     * @param  {Response} response
     */
    public async changeStatus(request: Request, response: Response){
        try {
            const taskId = request.params.id;
            const {status} = request.body||'';
            const container: Container = createContainer();
            const taskService = container.taskService;
            const updatedTask = await taskService.changeStatus(taskId,status );
            return response.status(200).send(updatedTask)
        } catch (error) {
            return response.status(500).send({
                status: 500,
                message: 'Failed to update task status'
            })
        }
    }

        /**
     * @param  {Request} request
     * @param  {Response} response
     */
         public async assign(request: Request, response: Response){
            try {
                const taskId = request.params.id;
                const {assignee} = request.body||'';
                const container: Container = createContainer();
                const taskService = container.taskService;
                const updatedTask = await taskService.assign(taskId,assignee );
                return response.status(200).send(updatedTask)
            } catch (error) {
                return response.status(500).send({
                    status: 500,
                    message: 'Failed to update task status'
                })
            }
        }
}
