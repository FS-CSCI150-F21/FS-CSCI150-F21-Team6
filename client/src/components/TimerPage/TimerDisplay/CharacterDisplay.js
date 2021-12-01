import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
// http://localhost:5000/api/v1/users/character?userId=${userId}
const CharacterDisplay = () => {
    const [ character, setCharacterState ] = useState({stats: "level: 0"})
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/character?userId=${userId}`)
            .then(
                response => {
                    console.log(response)
                    setCharacterState(response.data)
                    console.log("in render", character)
                }
            )
            .catch(error => {
                console.log(error)
            })

    }, [] )

    return (
            <Card>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <Avatar sx={{mb: 2}}/>
                    <Typography variant="p">
                        {character && character.char_name}
                        {character && character.stats.level} <br />
                        {character && character.stats.gold}
                    </Typography>

                </CardContent>
            </Card>
    )
}

export default CharacterDisplay;