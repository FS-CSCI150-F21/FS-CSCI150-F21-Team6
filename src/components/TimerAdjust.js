import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const AdjustModal = ({open, handleClose}) => {
    return (

            <Dialog open={open}>


                <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{p: 5}}>
                    <DialogTitle sx={{textAlign: "center", mb: 5}}> Adjust Timer Settings</DialogTitle>
                    <Typography>
                        Didn't want to have to do it didnt want to hae to
                    </Typography>
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