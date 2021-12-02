import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Inventory from "../Menu/Inventory"
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CharacterDisplay = ({character}) => {

    return (
            <Card sx={{width: 150, mb: 2}}>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <Avatar sx={{mb: 1}}/>
                    <Box sx={{mt: 1}} alignItems="center">
                        <TextField id="outlined-basic" label="Name" variant="outlined"  size="small" sx={{width: "100%"}} />
                        <Typography variant="p">
                            {character && character.char_name} <br />
                            Level: {character && character.stats.level} <br />
                            {character && character.stats.current_xp} / {character && character.stats.xp_to_next_level} <br />
                            Gold: {character && character.stats.gold}
                        </Typography>
                    </Box>

                    <Inventory />
                </CardContent>
            </Card>
    )
}

export default CharacterDisplay;