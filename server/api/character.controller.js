import CharacterDAO from "../dao/characterDAO.js"

export default class CharacterCtrl {
    static async apiGetCharacter(req, res, next) {
        const userId = req.query.userId
        const user = await CharacterDAO.getCharacter({
            userId
        })
        console.log(user.character)
        res.json(user.character)
    }

    static async apiUpdateCharacter(req, res, next) {
        try {
            const userId = req.body.user_id
            let characterInfo = {}
            if(req.body.char_name) {
                characterInfo.char_name = req.body.char_name
            }
            if(req.body.level) {
                characterInfo.level = req.body.level
            }
            if(req.body.xp_to_next_level) {
                characterInfo.xp_to_next_level = req.body.xp_to_next_level
            }
            if(req.body.max_hp) {
                characterInfo.max_hp = req.body.max_hp
            }
            if(req.body.current_hp) {
                characterInfo.current_hp = req.body.current_hp
            }
            if(req.body.gold) {
                characterInfo.gold = req.body.gold
            }

            const characterUpdateResponse = await CharacterDAO.updateCharacter(
                userId,
                characterInfo
            )

            var { error } = characterUpdateResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (characterUpdateResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update character - user id may be incorrect"
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json( {error: e.message })
        }
    }
}
