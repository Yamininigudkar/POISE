import React from 'react'

import { 
  Grid, Divider, Typography, TextField,
  Avatar, Paper
} from 'material-ui'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import { MenuItem } from 'material-ui/Menu'

import { notches } from '../../utils/dummyNotches'
import API from '../../utils/API';


class NotchesList extends React.Component{
 
 
 constructor(props){
  super(props)
  this.changeSearchBy = this.changeSearchBy.bind(this)
  this.displayNotches = this.displayNotches.bind(this)
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
     <Grid item lg={12} md={12} sm={12} >
      <Grid container>
       <Grid item lg={12} md={12} sm={12} >
        <center>
         <Typography type='heading' component='h1' color='primary'>
          Notches List
         </Typography>
        </center>
       </Grid>
      </Grid>
     </Grid>
     <Grid item lg={12} md={12} sm={12} >
      <Divider />
     </Grid>
     <Grid item lg={12} md={12} sm={12} >
      <Grid container>
       <Grid item lg={12} md={12} sm={12} >
        <Grid container>
         <Grid item lg={2} md={2} sm={2} > </Grid>
         <Grid item lg={8} md={8} sm={8} >
          <Grid container>
          {this.state.notches.map(notch => (
            <Grid item lg={12} md={12} sm={12} >
             <Card>
              <CardHeader
              title={notch.title.toUpperCase()}
              style={{backgroundColor: 'skyblue'}}
              />
              <CardContent>
               <Typography component='p'>
                Category: {notch.category}
               </Typography>
               <Typography component='p'>
                Experience: {notch.description}
               </Typography>
              </CardContent>
             </Card>
            </Grid>
          ))}
           
          </Grid>
         </Grid>
         <Grid item lg={2} md={2} sm={2} > </Grid>
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



