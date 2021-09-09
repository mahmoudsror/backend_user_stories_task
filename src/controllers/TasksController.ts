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
            const req = request.body;
            const result:ITask = await taskService.createTask(req);
    
            return response.send({ status: 200, result });
        } catch (error) {
            console.log("error", error)
           return response.status(500).send({status:500, message:"internal server error"}) 
        }
    }
    public list() {

    }

}
