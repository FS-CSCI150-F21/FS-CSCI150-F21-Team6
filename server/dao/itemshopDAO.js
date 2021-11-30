import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let items

export default class ItemShopDAO {
    static async injectDB(conn) {
        if (items) {
            return
        }
        try {
            items = await conn.db(process.env.USERINFO_NS).collection("itemshop")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in itemshopDAO: ${e}`,
            )
        }
    }

    static async getItems({
        filters = null,
        page = 0,
        itemsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { "name": filters.name }
            } else if ("type" in filters) {
                query = { "type": filters.type }
            }
        }

        let cursor

        try {
            cursor = await items.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { itemsList: [], totalNumItems: 0 }
        }

        const displayCursor = cursor.limit(itemsPerPage).skip(itemsPerPage * page)

        try {
            const itemsList = await displayCursor.toArray()
            const totalNumItems = await items.countDocuments(query)

            return { itemsList, totalNumItems }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { itemsList: [], totalNumItems: 0 }
        }
    }

    static async addItem(name, type, date) {
        try {
            const itemDoc = {
                name,
                type,
                date
            }

            await items.insertOne(itemDoc)

            return itemDoc
        } catch (e) {
            console.error(`Unable to add item: ${e}`)
            return { error: e }
        }
    }

    static async updateItem(itemId, itemInfo) {
        try {
            let updateResponse
            if(itemInfo.name && itemInfo.type) {
                updateResponse = await items.updateOne(
                    { _id: ObjectId(itemId) },
                    { $set: { name: itemInfo.name, type: itemInfo.type } }
                )
            } else if (itemInfo.name) {
                updateResponse = await items.updateOne(
                    { _id: ObjectId(itemId) },
                    { $set: { name: itemInfo.name } }
                )
            } else if (itemInfo.type) {
                updateResponse = await items.updateOne(
                    { _id: ObjectId(itemId) },
                    { $set: { type: itemInfo.type } }
                )
            }

            return updateResponse
        } catch (e) {
            console.error(`Unable to update item: ${e}`)
            return { error: e }
        }
    }

    static async deleteItem(itemId) {
        try {
            const deleteResponse = await items.deleteOne({
                _id: ObjectId(itemId)
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete item: ${e}`)
            return { error: e }
        }
    }
}