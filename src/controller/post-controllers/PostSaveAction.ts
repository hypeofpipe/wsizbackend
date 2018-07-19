import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../../entity/Post";
import { User } from "../../entity/User";

export async function postSaveAction(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)
    const newPost = new Post()
    const user = await getManager().getRepository(User).findOne(request.body.userId)
   
    newPost.user = user
    newPost.message = request.body.message
    
    await postRepository.save(newPost)

    response.send(newPost)
}