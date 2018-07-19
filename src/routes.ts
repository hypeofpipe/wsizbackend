import { userGetByUsername } from "./controller/user-controllers/UserGetByUsernameAction";
import { userGetByIdAction } from "./controller/user-controllers/UserGetByIdAction";
import { userGetAllAction } from "./controller/user-controllers/UserGetAllAction";
import { userSaveAction } from "./controller/user-controllers/UserSaveAction";
import { postSaveAction } from "./controller/post-controllers/PostSaveAction";
import { postGetAllAction } from "./controller/post-controllers/PostGetAllAction";
import { PostGetByIdAction } from "./controller/post-controllers/PostGetByIdAction";

export const AppRoutes = [
    {
        path:"/users",
        method: "post",
        action: userSaveAction
    },
    {
        path: "/users",
        method: "get",
        action: userGetAllAction
    },
    {
        path: "/users/:id",
        method: "get",
        action: userGetByIdAction
    },
    {
        path: "/users/getUserByUsername/:username",
        method: "get",
        action: userGetByUsername
    },
    {
        path:"/posts",
        method: "post",
        action: postSaveAction
    },
    {
        path: "/posts",
        method: "get",
        action: postGetAllAction
    },
    {
        path: "/posts/:id",
        method: "get",
        action: PostGetByIdAction
    }
];