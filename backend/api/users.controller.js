import UsersDAO from "../dao/usersDAO.js"

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.userName) {
            filters.user_name = req.query.userName
        } else if (req.query.id) {
            filters.id = req.query.id
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers,
        }
        res.json(response)
    }

    static async apiAddUser(req, res, next) {
        try{
            const userName = req.body.user_name
            const password = req.body.password
            const charName = req.body.char_name
            const date = new Date()

            const AddUserResponse = await UsersDAO.addUser(
                userName,
                password,
                charName,
                date
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const userId = req.body.id
            let userInfo = {}
            if(req.body.user_name) {
                userInfo.user_name = req.body.user_name
            }
            if (req.body.password) {
                userInfo.password = req.body.password
            }

            const userUpdateResponse = await UsersDAO.updateUser(
                userId,
                userInfo
            )

            var { error } = userUpdateResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (userUpdateResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update user - id may be incorrect"
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}