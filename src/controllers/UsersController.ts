import {Request, Response} from 'express';
import UserRepository from '../repositories/UsersRepository';
export class UsersController{

    public async create(request:Request, response: Response){
        const repo = new UserRepository()
        const body = request.body;
        console.log("Body", body)
        const usersSeed = [
            {
            name:'John'
        },
        {
            name: 'ali'
        }
    ]
    const newUsers =  await repo.save(usersSeed);
    return response.send(newUsers);
    }
}