import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class FriendsDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in friendsDAO: ${e}`,
            )
        }
    }

    static async getFriends(userId) {
        let query = { "_id": ObjectId(userId)}

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { user: [] }
        }

        const displayCursor = cursor.limit(1).skip(0)

        try {
            const user = await displayCursor.toArray()

            return { user }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { user: [] }
        }
    }

    static async addFriend(userId, newFriendsList) {
        try {
            let updateResponse = await users.updateOne(
                { _id: ObjectId(userId) },
                { $set: { friends_list: newFriendsList } }
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }

    /*static async updateUser(userId, userInfo) {
        try {
            let updateResponse
            if(userInfo.user_name && userInfo.password) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { user_name: userInfo.user_name, password: userInfo.password } }
                )
            } else if (userInfo.user_name) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { user_name: userInfo.user_name } }
                )
            } else if (userInfo.password) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { password: userInfo.password } }
                )
            }

            return updateResponse
        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return { error: e }
        }
    }*/

    static async deleteFriend(userId, newFriendsList) {
        try {
            let updateResponse = await users.updateOne(
                { _id: ObjectId(userId) },
                { $set: { friends_list: newFriendsList } }
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }
}