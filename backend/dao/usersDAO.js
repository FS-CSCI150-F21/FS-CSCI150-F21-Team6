import { ReturnDocument } from "mongodb"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("user_name" in filters) {
                query = { $text: { $search: filters["user_name"] } }
            } else if ("id" in filters) {
                query = { "_id": ObjectId(filters["id"]) }
            }
        }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { usersList: [], totalNumUsers: 0 }
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async addUser(userName, password, charName, date) {
        try {
            const userDoc = {
                user_name: userName,
                password: password,
                friends_list: {
                    num_friends: 0,
                    friends: [],
                    pending: []
                },
                character: {
                    char_name: charName,
                    stats: {
                        level: 1,
                        xp_to_next_level: 100,
                        max_hp: 10,
                        current_hp: 10,
                        stength: 5,
                        defense: 5,
                        gold: 0
                    },
                    achievements: [],
                    inventory: []
                },
                date_created: date
            }

            return await users.insertOne(userDoc)
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }
}