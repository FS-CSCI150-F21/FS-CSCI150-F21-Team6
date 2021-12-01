import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import StoreIcon from '@mui/icons-material/Store';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// will hard code an array until i can see how zacks api will return the items (item.img, item.stats, item.cost)
import Card from '@mui/material/Card';
import Axios from "axios"

const Item = ({itemName, itemStats, itemCost, isOwned}) => {

    if(isOwned){
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", border: "red solid 1" ,minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {itemName} <br />
                    {itemStats} <br />
                    {itemCost} <br />
                </Typography>
                <Button onClick={() => {}}>Owned</Button>
            </Card>
        )
    } else {
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {itemName} <br />
                    {itemStats} <br />
                    {itemCost} <br />
                </Typography>
                <Button>Buy</Button>
            </Card>
        )
    }
}

const ItemShop = () => {
    const [itemShop, setItemShop] = useState([])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        Axios.get("http://localhost:5000/api/v1/itemshop/")
            .then((res) => {
                const itemList = (res.data.items)
                setItemShop(itemList)
            })
            .catch(err => console.log(err))
    }, [])



    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <StoreIcon />
            </IconButton>

            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center" ,p: 5}}>
                        {itemShop.map(item => <Item itemName={item.name} itemCost={item.cost} />)}
                    </Box>
                </ClickAwayListener>
            </Dialog>
        </Box>
    )
}

export default ItemShop