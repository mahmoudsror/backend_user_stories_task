import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne
} from "typeorm";
import { Tasks } from "./Tasks";
import { Users } from "./Users";

@Entity()
export class TasksHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    status: string;

    @Column()
    action: string;

    @ManyToOne(() => Users, (user:any) => user.id)
    user: Users;
    
    @ManyToOne(() => Tasks, (task:any) => task.id)
    task: Users;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
