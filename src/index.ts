import "reflect-metadata";
import { createConnection, getManager } from "typeorm"
import { Request, Response } from "express"
import * as express from "express"
import * as bodyParser from "body-parser"
import { AppRoutes } from "./routes"
import { loginByUsername } from "./controller/login-controllers/loginByUsernameAction"
import * as utils from './auth/utils'
import { User } from "./entity/User"
import { Strategy } from "passport-local"
import { BasicStrategy } from "passport-http"
import { config } from "./auth/config";

const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const passport = require('passport')


createConnection().then(async connection => {

    const app = express()
    registrateAuth(app)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
      }))
    app.use(passport.initialize())

    AppRoutes.forEach(route => {
        app[route.method](
            route.path,
            passport.authenticate('get-user-by-jwt', { session: false }),
            (request: Request, response: Response, next: Function) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            })
    })

    app.post('/login', loginByUsername)

    app.post('/register', async function (req, res, next) {

        if (!req.body.username || !req.body.password){
            res.status(400)
            res.json('No ' + new String(!req.body.username ? 'username' : '') + new String(!req.body.password ? 'password' : ''))
            return
        }

        const hashPassword = await utils.hash(req.body.password)
        const user = await getManager().getRepository(User).findOne({ username: req.body.username })

        if (!user) {
            const newUser = await getManager().getRepository(User).create({ username: req.body.username, password: hashPassword })
            await getManager().getRepository(User).save(newUser)
            res.json('User ' + newUser.username + ' has been registered successfully!')
            return
        }

        res.json('Cannot register the user! Seems he is ' + user.username + ' and already in the system!')
    })

    app.listen(3000);

    console.log("Express application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))

function registrateAuth(app){
    passport.use('get-user-by-jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    },
    
        async function (jwtPayload, cb) {
    
            return await getManager().getRepository(User).findOne({ id: jwtPayload.id })
                .then(user => {
                    return cb(null, user)
                })
                .catch(err => {
                    return cb(err)
                })
        }
    ))
    
    passport.use('login-strategy', new BasicStrategy({
    },
        function (username, password, done) {
            process.nextTick(
                async function () {
                    const hashPassword = await utils.hash(password)
                    const user = await getManager().getRepository(User).findOne({ username: username })
                    if (!user) {
                        return done(null, false)
                    }
                    if (!utils.compareHash(hashPassword, String(user.password)))
                        return done(null, false)
                        
                    return done(null, user)
                }
            )
    
        }))
    app.use(passport.initialize())
}