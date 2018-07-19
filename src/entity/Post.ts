import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm' 
import { User } from './User';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    message: string

    @ManyToOne(type => User, user => user.posts)
    user: User

}