import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";

export async function userGetByUsername(request: Request, response: Response) {

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne({username: request.params.username});

    // if photo was not found return 404 to the client
    if (!user) {
        response.send('User was not found')
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(user);
}
