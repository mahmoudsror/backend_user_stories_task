import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Tasks } from "./Tasks";
import { TasksHistory } from "./TasksHistory";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Tasks, (task) => task.createdBy)
    tasks: Tasks[];
    
    @OneToMany(() => TasksHistory, taskHistory => taskHistory.user)
    taskHistory: TasksHistory[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}