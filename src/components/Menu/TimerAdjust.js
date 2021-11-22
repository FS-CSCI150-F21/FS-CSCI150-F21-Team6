import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ButtonGroup from '@mui/material/ButtonGroup';
// for adjust group (move into sep component once functionality is clear)
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import TimeMath from "../../services/TimeMath";


// for now this breaks the progress bar which i have to fix
const TimerAdjust = ({pomodoroLength , setPomodoroLength, setTimerSeconds}) => {
    const [open, setOpen] = useState(false);
    const [newPomodoroLength, setNewPomodoroLength] = useState(pomodoroLength);

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setPomodoroLength(newPomodoroLength)
        setTimerSeconds(TimeMath.convMinSec(newPomodoroLength));
    }
    // setTimerSeconds(TimeMath.convMinSec(pomodoroLength));
    const handleAddClick = (menuMinute, setMenuMinute) => {
        setMenuMinute(menuMinute + 1)
    }

return(
    <Box>
        <IconButton onClick={handleClickOpen}>
            <SettingsIcon />
        </IconButton>

        <Dialog open={open}>
            <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{display: "flex", margin: 5}}>
                    <Box sx={
                        {display: "flex", textAlign: "center",flexDirection: "column", border: "solid 1px black"}
                    }>
                        <Typography>Pomodoro</Typography>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <TextField value={newPomodoroLength} />
                            <ButtonGroup sx={{display: "flex", flexDirection: "column"}}>
                                <IconButton onClick={() => {handleAddClick(newPomodoroLength, setNewPomodoroLength)}}> <AddIcon /> </IconButton>
                                <IconButton> <RemoveIcon /> </IconButton>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
            </ClickAwayListener>
        </Dialog>
    </Box>
)
}

export default TimerAdjust