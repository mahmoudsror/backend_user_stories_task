import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { TasksHistory } from "./TasksHistory";
import { Users } from "./Users";

@Entity()
export class Tasks extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column("text")
    description: string;

    @Column("varchar")
    status: string="todo";

    @Column('increment')
    createdBy: number;
    @ManyToOne(() => Users,(Users) => Users.id)
    @JoinColumn({ name: "createdBy" })

    @Column()
    assignee: number;
    @ManyToOne(() => Users,(Users) => Users.id)
    @JoinColumn({ name: "assignee" })
    
    @OneToMany(() => TasksHistory, taskHistory => taskHistory.task)
    taskHistory: TasksHistory[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
