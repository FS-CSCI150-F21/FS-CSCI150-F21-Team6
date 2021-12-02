import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import BackpackIcon from '@mui/icons-material/Backpack';
import Friends from "../../Friends/Friends";


const InventoryModal = ({open, handleClose, items}) => {
    return (

        <Dialog open={open}>

            <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{p: 5}}>

                </Box>
            </ClickAwayListener>
        </Dialog>

    )
}

const Inventory = () => {
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
                <BackpackIcon />
            </IconButton>
            <InventoryModal open={open} handleClose={handleClose} />

        </Box>

    )
}

export default Inventory