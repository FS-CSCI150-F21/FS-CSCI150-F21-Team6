import { ReturnDocument } from "mongodb"

let airbnbs

export default class AirbnbsDAO {
    static async injectDB(conn) {
        if (airbnbs) {
            return
        }
        try {
            airbnbs = await conn.db(process.env.AIRBNBSINFO_NS).collection("listingsAndReviews")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in airbnbsDAO: ${e}`,
            )
        }
    }

    static async getAirbnbs({
        filters = null,
        page = 0,
        airbnbsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("bedrooms" in filters) {
                query = { "bedrooms": { $eq: parseInt(filters["bedrooms"]) } }
            }
        }

        let cursor

        try {
            cursor = await airbnbs.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { airbnbsList: [], totalNumAirbnbs: 0 }
        }

        const displayCursor = cursor.limit(airbnbsPerPage).skip(airbnbsPerPage * page)

        try {
            const airbnbsList = await displayCursor.toArray()
            const totalNumAirbnbs = await airbnbs.countDocuments(query)

            return { airbnbsList, totalNumAirbnbs }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { airbnbsList: [], totalNumAirbnbs: 0 }
        }
    }
}