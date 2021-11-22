import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// for adjust group (move into sep component once functionality is clear)
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';

const AdjustBox = ({title}) => {

    return (
        <Box sx={{display: "flex", textAlign: "center",flexDirection: "column"}}>
            <Typography>{title}</Typography>
            <Box sx={{display: "flex", alignItems: "center"}}>
                {/*value will actually be the toAdjust and the buttons will increment or decrement*/}
                <TextField value="12" />
                <ButtonGroup sx={{display: "flex", flexDirection: "column"}}>
                    <IconButton sx={{borderRadius: 0}}>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <RemoveIcon />
                    </IconButton>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

const AdjustModal = ({open, handleClose}) => {
    return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{display: "flex", margin: 5, backgroundColor: "pink"}}>
                        <AdjustBox title={"Pomodoro"}/>
                        <AdjustBox title={"Short Break"}/>
                        <AdjustBox title={"Long Break"}/>
                    </Box>
                </ClickAwayListener>
            </Dialog>

    )
}

const TimerAdjust = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        console.log('ran')
        setOpen(false)
    }

return(
    <Box>
        <IconButton onClick={handleClickOpen}>
            <SettingsIcon/>
        </IconButton>
        <AdjustModal open={open} handleClose={handleClose} />

    </Box>

)
}

export default TimerAdjust