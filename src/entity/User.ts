import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm' 
import { Post } from './Post';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: String

    @Column()
    password: String

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

}