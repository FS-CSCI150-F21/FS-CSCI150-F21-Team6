import { ReturnDocument } from "mongodb"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class CharacterDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in charactersDAO: ${e}`,
            )
        }
    }

    static async getCharacter({userId} = {}) {
        try {
            const query = { "_id": ObjectId(userId) }
            const cursor = await users.find(query)
            const result = cursor.next()
            return await result
        } catch (e) {
            console.error(`Unable to find specified user: ${e}`)
            return { error: `${e}` }
        }
    }

    static async updateCharacter(userId, characterInfo) {
        try {
            let updateResponses = []

            const query = { "_id": ObjectId(userId) }
            const cursor = await users.find(query)
            let updateResponse = cursor.forEach(async user => {
                let tempChar = user.character
                if(characterInfo.char_name) {
                    tempChar.char_name = characterInfo.char_name
                }
                if(characterInfo.level) {
                    tempChar.stats.level = characterInfo.level
                }
                if(characterInfo.xp_to_next_level) {
                    tempChar.stats.xp_to_next_level = characterInfo.xp_to_next_level
                }
                if(characterInfo.max_hp) {
                    tempChar.stats.max_hp = characterInfo.max_hp
                }
                if(characterInfo.current_hp) {
                    tempChar.stats.current_hp = characterInfo.current_hp
                }
                if(characterInfo.strength) {
                    tempChar.stats.strength = characterInfo.strength
                }
                if(characterInfo.defense) {
                    tempChar.stats.defense = characterInfo.defense
                }
                if(characterInfo.gold) {
                    tempChar.stats.gold = characterInfo.gold
                }
                let response = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { character: tempChar } }
                )
                return response
            })

            return updateResponse
        } catch (e) {
            console.error(`Unable to update character: ${e}`)
            return { error: e }
        }
    }
}
