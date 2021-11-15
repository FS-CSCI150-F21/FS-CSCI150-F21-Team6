import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';

const QDT = createTheme({

})

const Quest = ({ title, isActive }) => {
    const handleClick = () => {
        if (!isActive){

        }
    }

    return (
        <ThemeProvider theme={QDT}>
            {/*className={ isActive === true ? classes.active : classes.base }*/}
            <ListItemButton >{title}</ListItemButton>
        </ThemeProvider>
    )
}

const QuestDisplay = () => {
    const [quests, setQuests] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/data')
            .then(res => {
                setQuests(res.data[0].quests)
            })
    }, [])

    return (
        <List sx={{maxHeight: 100, overflow: 'auto', mt: 5}}>
            {quests.map(quest => <Quest title={quest.title} isActive={quest.isActive}/>)}
        </List>
    )
}

export default QuestDisplay