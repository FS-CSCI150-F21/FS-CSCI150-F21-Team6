import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';
// implement custom themes with createtheme and theme provider eventually

const QuestDisplay = () => {
    const [quests, setQuests] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleClick = (id) => {

    }

    useEffect(() => {
        axios.get('http://localhost:3001/data')
            .then(res => {
                setQuests(res.data[0].quests)
            })
    }, [])

    return (
        <List sx={{maxHeight: 100, overflow: 'auto', mt: 5}}>
            {
                quests.map(quest => <ListItemButton selected = { selectedIndex === quest.id } >{quest.title}</ListItemButton>)
            }
        </List>
    )
}

export default QuestDisplay