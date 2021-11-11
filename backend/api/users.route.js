import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router
    .route("/")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiAddUser)
    .put(UsersCtrl.apiUpdateUser)
    //.delete(UsersCtrl.apiDeleteUser)

export default router
