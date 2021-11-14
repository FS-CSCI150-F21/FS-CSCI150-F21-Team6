import axios from 'axios';

const levelUp = () => {
    console.log("levelup")
}

const expInc = (experienceEarned, character, setCharacterState) => {
    console.log("experience increment function ran")
    if (experienceEarned + character.exp > character.expReq) {
        levelUp()

    } else{
        setCharacterState = {...character, exp: character.exp + experienceEarned}
        console.log("earned experience", character)
    }
}

const goldInc = () => {

}


export default { expInc }