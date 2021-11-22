import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';
// implement custom themes with createtheme and theme provider eventually

const NewTaskHandler = ({quests, setQuests}) => {
    const [newQuest, setNewQuest] = useState('')

    const handleQuestChange = (event) => {
        setNewQuest(event.target.value)
    }

    const handleQuestAdd = () => {
// needs to be reworked for dealing with api but core functionality is there
        const newQuestObj = {
            id: 4,
            title: newQuest,
            totalPomoDone: 2
        }
        setQuests(quests.concat(newQuestObj))
        setNewQuest('')
    }

return (
    <Box sx={{display: "flex", mt: 1, p: 1}}>
        <TextField id="outlined-basic" label="Enter new task" variant="outlined" onChange={handleQuestChange} value={newQuest} size="small" sx={{width: "100%"}} />
        <Box sx={{display: "flex", alignItems: "center", ml: 2}}>
            <Button variant={"contained"} size={"small"} onClick={handleQuestAdd}>+</Button>
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

    const handleAddClick = () => {
        setQuests()
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
                    quests.map(quest =>  <ListItemButton selected={selectedIndex === quest.id} onClick={() => {handleClick(quest.id)}}>{quest.title}</ListItemButton>)
                }
            </List>
            <NewTaskHandler setQuests={setQuests} quests={quests}/>
        </Box>

    )
}

export default QuestDisplay