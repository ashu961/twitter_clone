import React from 'react';
import {Typography, IconButton, Card, CardHeader, Avatar, CardContent, CardActions, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
const useStyles = makeStyles({
  search:{
    display:'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px'
  }
})

function Tweets({status}) {
  const classes = useStyles();
  let msec= new Date()-new Date(status.created_at);
  let day = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= day * 1000 * 60 * 60 * 24
  let hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  let mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  let ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  let time = day>=1 ? day+'d' : 24>hh && hh>=1 ? hh+'h' : 60>mm && mm>=1 ? mm+'m' : ss+'s'
  let subheader=status.entities.user_mentions!=0 ? 'Replying to': null;
  if(status.entities.user_mentions.length!=0){
    status.entities.user_mentions.forEach(user=>{
        subheader+=' '+'@'+user.screen_name
    })
  }  
  return (
    <div>
        <Card style={{backgroundColor:'#fafafa'}}>
                <CardHeader
                    avatar={
                        <Avatar alt='avatar' src={status.user.profile_image_url_https}/>
                    }
                    title={status.user.name+' '+'@'+status.user.screen_name+' '+'-'+' '+time}
                    subheader={subheader}
                />
                {
                    status.text ? <CardContent>
                    <Typography style={{padding:'0px 40px'}} variant="body2"  component="p">
                        {status.text}
                    </Typography>
                </CardContent> : null
                }
                {
                    status.entities.media && status.entities.media.length!=0 ? <CardMedia
                    style={{height: 300,width: 400,margin:'0px 60px'}}
                    image={status.entities.media[0].media_url_https}
                    /> : null
                }
                <CardActions style={{display:'flex',justifyContent:'space-around'}}>
                    <IconButton >
                        <ChatBubbleOutlineIcon/>
                    </IconButton>
                    <IconButton >
                        <RepeatIcon/>
                    </IconButton>
                    <IconButton >
                        <FavoriteBorderIcon/>
                    </IconButton>
                    <IconButton >
                        <SystemUpdateAltIcon/>
                    </IconButton>
                </CardActions>
            </Card>
    </div>
  );
}

export default Tweets;
