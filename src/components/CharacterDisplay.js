import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const CharacterDisplay = ({character}) => {
    return (
            <Card>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <Avatar sx={{mb: 2}}/>
                    <Typography variant="p">
                        {character.name}
                    </Typography>
                    <Typography style={{wordWrap: "break-word"}}>
                        {character.level}
                        <br/>
                        {character.exp} / {character.expReq}
                        <br/>
                        {character.gold}
                    </Typography>
                    <Typography>
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default CharacterDisplay;