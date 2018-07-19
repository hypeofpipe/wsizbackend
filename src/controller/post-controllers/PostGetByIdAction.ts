import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../../entity/Post";

export async function PostGetByIdAction(request: Request, response: Response) {

    const postRepository = getManager().getRepository(Post);

    const post = await postRepository.findOne(request.params.id);

    if (!post) {
        response.send('Post was not found')
        response.status(404)
        response.end()
        return
    }

    response.send(post)
}
