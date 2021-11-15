import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';
// implement custom themes with createtheme and theme provider eventually

const NewTask = () => {
return (
    <Box sx={{display: "flex", mt: 1, p: 1}}>
        <TextField id="outlined-basic" label="New Quest" variant="outlined" size="small" sx={{width: "100%"}}/>
        <Box sx={{display: "flex", alignItems: "center", ml: 2}}>
            <Button variant={"contained"} size={"small"} >+</Button>
        </Box>
    </Box>
)
}

const QuestDisplay = ({setActiveTask}) => {
    const [quests, setQuests] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleClick = (id) => {
        setSelectedIndex(id)
        setActiveTask(quests[id - 1].title)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/data')
            .then(res => {
                setQuests(res.data[0].tasks)
                setActiveTask(res.data[0].tasks[selectedIndex - 1].title)
            })
    }, [])


    return (
        <Box>
            <List sx={{maxHeight: 105, overflow: 'auto', mt: 5}}>
                {
                    quests.map(quest => <ListItemButton selected={selectedIndex === quest.id} onClick={() => {handleClick(quest.id)}}>{quest.title}</ListItemButton>)
                }
            </List>
            <NewTask/>
        </Box>

    )
}

export default QuestDisplay