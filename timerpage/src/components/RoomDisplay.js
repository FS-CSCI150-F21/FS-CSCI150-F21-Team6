import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RoomDisplay = ({pomosCompleted, multiplier}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="p">
                    Rooms:<br></br>
                    Complete: {pomosCompleted}
                    <br></br>
                    Multiplier: {pomosCompleted === 0 ? 1 : 1 + (multiplier)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoomDisplay;