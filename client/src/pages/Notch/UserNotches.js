import React from 'react'

import {
  Avatar, Typography, IconButton,Button
} from 'material-ui'
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card'
import {
 ExpandMoreIcon, FavoriteIcon, ShareIcon
} from 'material-ui-icons'
import { red } from 'material-ui/colors'
import API from '../../utils/API';

class UserNotchCard extends React.Component{
  constructor(props){
  super(props)
  this.deleteNotch = this.deleteNotch.bind(this)
  this.state ={}
} 
deleteNotch(){
  console.log(this.props)
  API.deleteNotch(this.props.id)
  .then(res =>{
    console.log("notch deleted")
    console.log(res)
  })

}


 render() {
  return(
  <Card style={{margin: 20,width:700}}>
  <CardHeader
  avatar={
    <Avatar aria-label="Recipe" style={{backgroundColor: '#3CB371'}}>
  
    📍
    </Avatar>
  }
  action={
    <IconButton>
    
    </IconButton>
  }
  title={this.props.title}
  subheader={this.props.timestamp}
  />
  <CardMedia image={this.props.imgUrl} title="Image Title" >
  <img src={this.props.imgUrl} style={{width:550}}/>
 
  </CardMedia>
  <CardContent>

  <Typography component="h4">
  Category:{this.props.category}
  </Typography>
  <Typography component="p">
  {this.props.description}
  </Typography>
  <Button raised id='Remove' onClick={this.deleteNotch}  color='primary' style={{margin:10}}>
        Remove
        </Button>
  </CardContent>
  </Card>

  )
}
}

  export default UserNotchCard