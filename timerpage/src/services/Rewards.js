import CharacterUpdate from "./Character"
const handleRoomComplete = (pomoscompleted, character, setCharacterState) => {
    if (pomoscompleted % 2 === 0){
        console.log('room complete % 2')
        const experienceEarned = pomoscompleted * (character.level * 5);
        CharacterUpdate.expInc(experienceEarned, character, setCharacterState)
    } else {
        console.log('room complete % 2 != 0')
    }
}
export default { handleRoomComplete }

