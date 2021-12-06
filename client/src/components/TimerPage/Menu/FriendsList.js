import React, {useEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"

const AddFriend = ({friends, setFriends, numFriends, setNumFriends}) => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    const [userName, setUserName] = useState("")
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    const handleSubmit = (e) => {
        if (e.keyCode === 13){
            const newFriendObj = {
                user_id: userId,
                friend_user_name: userName
            }
            setFriends(friends.concat())
            axios.post(`http://localhost:5000/api/v1/users/friends`, newFriendObj)
                .then(res => {
                    setFriends(friends.concat(res.data.friend))
                    setNumFriends(numFriends + 1)
                })
                .catch(e => console.log(e.response))
        }
        else {
            console.log(e.keyCode)
        }
    }

    return (
        <TextField value={userName} onChange={handleChange} onKeyDown={handleSubmit} />
    )
}

const FriendsModal = ({open, handleClose, friends, numFriends, setFriends, setNumFriends, isLoading}) => {
    if (isLoading) {
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 5}}>
                    </Box>
                </ClickAwayListener>
            </Dialog>
        )
    } else {
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 5}}>
                        <Typography>You have {numFriends} friends added</Typography>
                        <List>
                            {(numFriends > 0) && friends.map(friend => <ListItem>Name: {friend.user_name} Level: {friend.character.stats.level}</ListItem>)}
                        </List>
                        <AddFriend setFriends={setFriends} friends={friends} numFriends={numFriends} setNumFriends={setNumFriends} />
                    </Box>

                </ClickAwayListener>
            </Dialog>
        )
    }
}

const FriendsList = () => {
    const [open, setOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/friends/?userId=${userId}`)
            .then(res => {
                setFriends(res.data.friends)
                setNumFriends(res.data.num_friends)
                setLoading(false);
            })
    }, [])
    console.log(friends)
    console.log(numFriends)
    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <ChildCareIcon />
            </IconButton>
            <FriendsModal open={open} handleClose={handleClose} friends={friends} setNumFriends={setNumFriends} numFriends={numFriends} setFriends={setFriends} isLoading={isLoading} />
        </Box>
    )
}

export default FriendsList