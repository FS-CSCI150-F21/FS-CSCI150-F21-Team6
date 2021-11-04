import express from "express"
import AirbnbsCtrl from "./airbnbs.controller.js"

const router = express.Router()

router.route("/").get(AirbnbsCtrl.apiGetAirbnbs)

export default router