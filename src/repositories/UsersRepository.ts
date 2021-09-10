import { getRepository } from "typeorm";
import { Users } from "../entities/Users";
export default class UserRepository {

    public async save(dummyUser:any) {
        try {
            const userRepository = getRepository(Users);
            const user = new Users();
            const createdUser = await userRepository.create({
                ...user,
                ...dummyUser,
            });
            return createdUser;
        } catch (error) {
            console.log("create user Error : ", error)
            throw error;
        }
    }
}