import FriendsDAO from "../dao/friendsDAO.js"

export default class FriendsCtrl {
    static async apiGetFriends(req, res, next) {
        try{
            let userId
            if (req.query.userId) {
                userId = req.query.userId
            } else {
                res.status(400).json("Please query based on a userId.")
                return
            }

            let daoResponse = await FriendsDAO.getFriends(userId)

            const user = daoResponse.user[0];
            let friendsList = user.friends_list.friends
            let totalNumFriends = user.friends_list.num_friends
            let response

            if (req.query.friendId) {
                let friendId = req.query.friendId
                for (var i = 0; i < friendsList.length; i++)
                {
                    if(friendsList[i]._id == friendId)
                    {
                        response = {
                            friend: friendsList[i]
                        }
                        break
                    }
                }
            } else {
                response = {
                    friends: friendsList,
                    num_friends: totalNumFriends
                }
            }
            
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiAddFriend(req, res, next) {
        try{
            let userId
            let friendId
            if(req.body.user_id && req.body.friend_id) {
                userId = req.body.user_id
                friendId = req.body.friend_id
                if (userId == friendId)
                {
                    res.status(400).json("Cannot have a user friend themself (user_id should not equal friend_id).")
                    return
                }
            } else {
                res.status(400).json("Please include user_id and friend_id in the body of the request.")
                return
            }

            const userResult = await FriendsDAO.getFriends(userId)
            const friendResult = await FriendsDAO.getFriends(friendId)

            let user = userResult.user[0]
            let friend = friendResult.user[0]
            let friendsList = user.friends_list.friends
            let friendExists = false

            for (var i = 0; i < friendsList.length; i++)
            {
                if(friendsList[i]._id == friendId)
                {
                    friendExists = true
                }
            }

            if(friendExists) {
                res.status(400).json("Target user is already friended with this user.")
                return
            }

            let friendInfo = {}
            friendInfo._id = friend._id
            friendInfo.user_name = friend.user_name
            friendInfo.character = friend.character
            user.friends_list.friends.push(friendInfo)
            user.friends_list.num_friends = user.friends_list.num_friends + 1

            const newFriendsList = user.friends_list

            const response = await FriendsDAO.addFriend(userId, newFriendsList)

            res.json({ status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /*static async apiUpdateFriend(req, res, next) {
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
    }*/

    static async apiDeleteFriend(req, res, next) {
        try{
            let userId
            let friendId
            if(req.body.user_id && req.body.friend_id) {
                userId = req.body.user_id
                friendId = req.body.friend_id
                if (userId == friendId)
                {
                    res.status(400).json("Cannot have a user friend themself (user_id should not equal friend_id).")
                    return
                }
            } else {
                res.status(400).json("Please include user_id and friend_id in the body of the request.")
                return
            }

            const userResult = await FriendsDAO.getFriends(userId)
            
            let user = userResult.user[0]
            let friendsList = user.friends_list.friends
            let friendExists = false
            
            for (var i = 0; i < friendsList.length; i++)
            {
                if(friendsList[i]._id == friendId)
                {
                    friendsList.splice(i, 1)
                    friendExists = true
                    break
                }
            }

            if(!friendExists) {
                res.status(400).json("Target user is not friended with this user.")
                return
            }

            user.friends_list.num_friends = user.friends_list.num_friends - 1

            const newFriendsList = user.friends_list

            const response = await FriendsDAO.deleteFriend(userId, newFriendsList)

            res.json({ status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}