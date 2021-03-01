import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, Divider } from '@material-ui/core';
import './style.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Body() {
    return (

        <div className='body-main'>
            
            <Card className='card-presentation'>
                
                <CardHeader 
                    title="Felipe Farias"
                    className="card-title"
                />

            <CardContent>

                <div className="card-content">

                    <Avatar className="card-content-avatar">FF</Avatar>

                    <div>
                        <Typography>
                            <WorkIcon/> Engenheiro de Software
                        </Typography>

                        <Typography>
                            <LocationOnIcon/> São Paulo - Brasil
                        </Typography>

                        <Typography>
                            <EmailIcon/> feliipefarias@outlook.com
                        </Typography>

                        <Typography>
                            <GitHubIcon/> /felipefariasdasilva
                        </Typography>

                        <Typography>
                            <LinkedInIcon/> /felipefariasdasilva
                        </Typography>
                    </div>

                </div>

                

            </CardContent>

            </Card>

            <Divider light />

            <h1>Portfolio</h1>

            <div className='portfolios'>

                <Card className="portfolio-card">
                    <CardHeader title=' E-commerce' />
                    <CardContent>
                        <div></div>
                    </CardContent>

                </Card>

                <Card className="portfolio-card">
                    <CardHeader title=' E-learn' />
                    <CardContent>
                        <div></div>
                    </CardContent>
                </Card>

            </div>

            <Divider light />
            
            <h1>Artigos</h1>
            <Button variant="contained" color="primary"> 
                <Link to="articles">
                    Veja todos os Artigos
                </Link>
            </Button>

            <br/>
            
        </div>

    )
}

export default Body
