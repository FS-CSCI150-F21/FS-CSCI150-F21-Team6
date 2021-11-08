import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CharacterDisplay = ({name, level, gold}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="p">
                    {name}
                </Typography>
                <Typography style={{wordWrap: "break-word"}}>
                    🆙 {level}
                    <br></br>
                    💰 {gold}
                </Typography>
                <Typography>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CharacterDisplay;