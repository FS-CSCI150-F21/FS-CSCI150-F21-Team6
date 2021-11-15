import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import axios from 'axios';

const Quest = ({ title }) => {
    return (
        <ListItemButton> {title} </ListItemButton>
    )
}

const QuestDisplay = () => {
    const [isActive, setIsActive] = useState('')
    const [quests, setQuests] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/data')
            .then(res => {
                setQuests(res.data[0].quests)
            })
    }, [])

    return (
        <List sx={{maxHeight: 100, overflow: 'auto', mt: 5}}>
            {quests.map(quest => <Quest title={quest} />)}
        </List>
    )
}

export default QuestDisplay