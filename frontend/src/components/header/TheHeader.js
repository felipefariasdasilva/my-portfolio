import React from 'react'
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'

function TheHeader() {

    const history = useHistory()

    return (
        <AppBar position="static">

            <Toolbar>

                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>

                <Typography variant="h6">
                    Felipe Farias Dev
                </Typography>
              
            </Toolbar>
        </AppBar>
    )
}

export default TheHeader
