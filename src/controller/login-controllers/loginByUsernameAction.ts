import { Request, Response } from "express";
import { getManager } from "typeorm";
import * as util from 'util'
import passport = require('passport')
import jwt = require('jsonwebtoken')
import { config } from "../../auth/config";

export function loginByUsername(request: Request, response: Response) {

    passport.authenticate('login-strategy', { session: false }, (err, user, info) => {
        try {
            if (err || !user) {
                return response.status(400).json({
                    message: 'Something is not right. Error ' + err,
                    user: user
                })
            }

            request.login(user, { session: false }, (err) => {
                if (err) {
                    response.send(err)
                }

                console.log(user)

                const stringifiedUser = { id: user.id }

                const token = jwt.sign(stringifiedUser, config.secret)
                return response.json({ stringifiedUser, token })
            })
        }
        catch (err) {
            console.log(err)
        }


    })(request, response)
}

