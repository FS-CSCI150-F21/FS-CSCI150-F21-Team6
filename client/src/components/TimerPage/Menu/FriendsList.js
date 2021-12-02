import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Friends from '../../Friends/Friends'


const FriendsModal = ({open, handleClose}) => {
    return (

        <Dialog open={open} sx={{padding: 5}}>
            <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{p: 5}}>
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