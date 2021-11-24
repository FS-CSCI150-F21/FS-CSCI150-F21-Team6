import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import StoreIcon from '@mui/icons-material/Store';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// will hard code an array until i can see how zacks api will return the items (item.img, item.stats, item.cost)
import Card from '@mui/material/Card';

const testArr = [
    {
        name: "Sword",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    },
    {
        name: "Staff",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    },
    {
        name: "Mace",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    },
    {
        name: "Sword",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    },
    {
        name: "Staff",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    },
    {
        name: "Mace",
        itemStats: {
            str: 1,
            int: 2,
            wis: 3
        },
        price: 123
    }
]

const Item = ({itemName, itemStats, itemPrice, itemImg, isOwned}) => {

    const handleBuyClick = () => {
    //    api call here to update character and set status to bought

    }

    if(isOwned){
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", border: "red solid 1" ,minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {itemName} <br />
                    {itemStats} <br />
                    {itemPrice} <br />
                </Typography>
                <Button onClick={handleBuyClick}>Owned</Button>
            </Card>
        )
    } else {
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {itemName} <br />
                    {itemStats} <br />
                    {itemPrice} <br />
                </Typography>
                <Button>Buy</Button>
            </Card>
        )
    }
}

const ItemShop = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <StoreIcon />
            </IconButton>

            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center" ,p: 5}}>
                    {/* <Item itemName={"Sword"} itemStats={"+Str"} /> */}
                    {/*  here we need an api call to check if the item is in our inventory, if it is then we return the item with a red border, if it isn't return normally  */}
                        {testArr.map(item => <Item itemName={item.name} itemStats={"+Str"} itemPrice={item.price} />)}
                    </Box>
                </ClickAwayListener>
            </Dialog>
        </Box>
    )
}

export default ItemShop