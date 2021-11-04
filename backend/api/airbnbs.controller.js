import AirbnbsDAO from "../dao/airbnbsDAO.js"

export default class AirbnbsCtrl {
    static async apiGetAirbnbs(req, res, next) {
        const airbnbsPerPage = req.query.airbnbsPerPage ? parseInt(req.query.airbnbsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.bedrooms) {
            filters.bedrooms = req.query.bedrooms
        }

        const { airbnbsList, totalNumAirbnbs } = await AirbnbsDAO.getAirbnbs({
            filters,
            page,
            airbnbsPerPage,
        })

        let response = {
            airbnbs: airbnbsList,
            page: page,
            filters: filters,
            entries_per_page: airbnbsPerPage,
            total_results: totalNumAirbnbs,
        }
        res.json(response)
    }
}