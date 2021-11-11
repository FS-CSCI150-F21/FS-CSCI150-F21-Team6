import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)

/*router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)*/

export default router