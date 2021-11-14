import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const CharacterDisplay = ({character}) => {
    return (
        <Box sx={{ml: 10, width: '9%'}}>
            <Card>
                <CardContent>
                    <Typography variant="p">
                        {character.name}
                    </Typography>
                    <Typography style={{wordWrap: "break-word"}}>
                        {character.level}
                        <br></br>
                        {character.exp} / 300
                        <br></br>
                        {character.gold}
                    </Typography>
                    <Typography>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CharacterDisplay;