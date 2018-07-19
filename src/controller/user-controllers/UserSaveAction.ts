import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";

/**
 * Saves given post.
 */
export async function userSaveAction(request: Request, response: Response) {

    const userRepository = await getManager().getRepository(User);

    const newUser = new User()

    newUser.username = request.body.username
    newUser.password = request.body.password
    newUser.posts = request.body.postsId

    await userRepository.save(newUser)

    response.send(newUser)
}