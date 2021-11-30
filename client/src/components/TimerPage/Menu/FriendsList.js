import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Friends from '../../Friends/Friends'


const FriendsModal = ({open, handleClose}) => {
    return (

        <Dialog open={open}>

            <ClickAwayListener onClickAway={handleClose}>
                <Box width={1000} sx={{p: 5}}>
                    <Friends />
                </Box>
            </ClickAwayListener>
        </Dialog>

    )
}

const FriendsList = () => {
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
                <ChildCareIcon />
            </IconButton>
            <FriendsModal open={open} handleClose={handleClose} />

        </Box>

    )
}

export default FriendsList