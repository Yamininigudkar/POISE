import React from 'react'

import { 
  Grid, Typography, Select,
  Divider, TextField, Button,Paper
} from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { Clear } from 'material-ui-icons'
import '../../styles/rightbar.css'
import API from '../../utils/API';

const styles = {
  img:{
    width:500 ,
    height:450,
    margin:'auto'
}
}

class NotchCard extends React.Component{

  constructor(props){
    super(props)
    this.state = {

        notchData:{},
        image:''
        
    }

}

componentWillMount(){
    console.log("data",this.props.data)
    console.log("notchdata",this.state.notchData)
    

    API.notchDetails(this.props.data.id)
    .then(res =>{
        console.log(res, "this came back after")
        this.setState({notchData:res.data})
        this.setState({image:'/'+'/localhost:3001/findoneimage/'+this.props.data._id})
    })

    
}



render(){
    return (
       <Paper id='right-paper' style={{padding: '10px'}}>
       <Grid container id='add-notch-dialog' style={{ margin: '10px'}}>
       <Grid item lg={12} md={12} sm={12} > 
       <Grid item lg={10} md={10} sm={10} >
       <Grid container>
       <Grid item lg={12} md={12} sm={12} >
       <center>
       <Typography type='heading' component='h1' color='primary'>
       {this.state.notchData.title}
       </Typography>
       </center>
       </Grid>
       <Grid item lg={12} md={12} sm={12} >
       <center>
       <Divider />
       <img src={this.state.image} style={styles.img}/>
       </center>
       </Grid>
       <Divider/>
       <Grid item lg={12} md={12} sm={12} >
       <Typography type='heading' component='h4' >
       Category: {this.state.notchData.category}
       </Typography>

       </Grid>
       <Grid item lg={12} md={12} sm={12} >
       <Typography type='heading' component='p' >
       {this.state.notchData.description}
       </Typography>

       </Grid>

       <Grid item lg={12} md={12} sm={12} >
       <center>
       <Button raised color='primary' >
       Close
       </Button>
       </center>
       </Grid>

       </Grid>
       <Grid item lg={1} md={1} sm={1} > </Grid>
       </Grid>
       </Grid>
       </Grid>
       </Paper>
       )
}
}

export default NotchCard
