import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TimerDisplay = ({timerMode, timer, reward}) => {
    return (
        <Card>
            <CardContent>
                <Typography>
                    {timerMode}
                </Typography>
                <Typography variant='h2'>
                    {timer}
                </Typography>
                <Typography>
                    Reward: {reward}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default TimerDisplay