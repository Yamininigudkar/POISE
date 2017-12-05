import React from 'react'

import {
  Avatar, Typography, IconButton,Button
} from 'material-ui'
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card'
import {
 ExpandMoreIcon, FavoriteIcon, ShareIcon
} from 'material-ui-icons'
import { red } from 'material-ui/colors'

const UserNotchCard = (props) => (
  
  <Card style={{margin: 20,width:700}}>
  <CardHeader
  avatar={
    <Avatar aria-label="Recipe" style={{backgroundColor: "red"}}>
    {props.avatarLetter}
    </Avatar>
  }
  action={
    <IconButton>
    
    </IconButton>
  }
  title={props.title}
  subheader={props.timestamp}
  />
  <CardMedia image={props.imgUrl} title="Image Title" >
  <img src={props.imgUrl} style={{width:500}}/>
 
  </CardMedia>
  <CardContent>
  <Typography component="p">
  {props.description}
  </Typography>
  <Button raised id='Remove'  color='primary' style={{margin:10}}>
        Remove
        </Button>
  </CardContent>
  </Card>

  )

  export default UserNotchCard