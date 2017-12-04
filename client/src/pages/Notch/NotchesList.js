import React from 'react'
import { 
  Grid, Divider, Typography, TextField,
  Avatar, Paper,Button
} from 'material-ui'
import Card, { CardHeader, CardContent} from 'material-ui/Card'
import { MenuItem } from 'material-ui/Menu'
import API from '../../utils/API';
import NotchCard from './notchCard'
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog, { DialogTitle } from 'material-ui/Dialog'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 550,
    height: 500,
    overflowY: 'auto',
  },
};


class NotchesList extends React.Component{


 constructor(props){
  super(props)
  this.changeSearchBy = this.changeSearchBy.bind(this)
  this.displayNotches = this.displayNotches.bind(this)
  this.openNotch = this.openNotch.bind(this)
  this.closeNotch = this.closeNotch.bind(this)
  this.state = {
   searchBy: 'radius',
   notches:[]
 }
}
componentDidMount(){
  this.displayNotches()
}
changeSearchBy(event){
  this.setState({
   searchBy: event.target.value
 })
}
openNotch(){
  this.setState({
    notchOpened: true,
  })
}

closeNotch(){
  this.setState({
    notchOpened: false,
  })
}

displayNotches(){
  console.log("working")
  API.getAllNotches()
  .then(notchdata =>{
   console.log("notchdata",notchdata)
   this.setState({notches:notchdata.data})

 })
}
render(){
  return (
   <Paper id='right-paper' style={{padding: '10px'}}>
   
   <Grid container>
   <Grid item lg={12} md={12} sm={12} xs={12} >
   <Grid container>
   <Grid item lg={12} md={12} sm={12} xs={12}>
   <center>
   <Typography type='heading' component='h1' color='primary'>
   Notches List
   </Typography>
   </center>
   </Grid>
   </Grid>
   </Grid>
   <Grid item lg={12} md={12} sm={12} xs={12} >
   <Divider />
   </Grid>
   <Grid item lg={12} md={12} sm={12} xs={12} >
   <Grid container>
   <Grid item lg={12} md={12} sm={12} xs={12} >
   <Grid container>
   <Grid item lg={2} md={2} sm={2} xs={2}> </Grid>
   <Grid item lg={8} md={8} sm={8} xs={8} >
   <div style={styles.root}>
   <GridList
   cellHeight= {180}
   style={styles.gridList}
   id="notchlist"
   >
   {this.state.notches.map(notch => (

    <Grid key={notch._id} item lg={12} md={12} sm={12} xs={12} >
    <Card>
    <CardHeader
    avatar={
                            <Avatar aria-label='Recipe' style={{ backgroundColor:'green'}}>
                              📍
                            </Avatar>
                          }
    key={notch.title}
    title={notch.title.toUpperCase()}
    style={{backgroundColor: 'skyblue'}}
    >
    </CardHeader>
    <CardContent>
    <Typography key={notch.category} component='p'>
    Category: {notch.category}
    </Typography>
    <Typography key={notch.description} component='p'>
    Experience: {notch.description}
    </Typography>
    <Button  onClick={this.openNotch} >View Notch</Button>
    <Dialog
    
    open={this.state.notchOpened}
    onRequestClose={this.closeNotch} id='NotchCard-Modal'>
    <NotchCard 
    
    id={notch._id} 
    />
    </Dialog>
    </CardContent>
    </Card>
    </Grid>
    
    ))}

   </GridList>
   </div>
   </Grid>
   <Grid item lg={2} md={2} sm={2} xs={12} > </Grid>
   </Grid>
   </Grid>
   </Grid>
   </Grid>
   </Grid>

   </Paper>
   )
}
}

export default NotchesList



