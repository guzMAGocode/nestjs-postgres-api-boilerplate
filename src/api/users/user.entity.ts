import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import {Exclude} from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Task } from "../tasks/task.entity";

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column({ nullable: true })
    company: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @OneToMany(type => Task, task => task.user, { eager : true })
    tasks: Task[];

    async validatePassword(password : string) : Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
 
}