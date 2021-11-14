import axios from 'axios';
const handleRoomComplete = (pomoscompleted) => {
    if (pomoscompleted % 2 == 0){
        console.log('room complete % 2')

    } else {
        console.log('room complete % 2 != 0')
    }
}
export default { handleRoomComplete }

