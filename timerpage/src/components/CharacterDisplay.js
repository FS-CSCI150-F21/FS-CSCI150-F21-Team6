import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const CharacterDisplay = ({name, level, gold}) => {
    return (
        <Box sx={{ml: 10, width: '9%'}}>
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
        </Box>
    )
}

export default CharacterDisplay;