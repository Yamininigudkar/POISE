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

        notchData:{}
    }
}
componentDidMount() {
    console.log(this.props.data)
    API.notchDetails(this.props.id)
    .then(res => this.setState({ notchData: res.data }))
    .catch(err => console.log(err));
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
     <img src={this.state.notchData.img} style={styles.img}/>
     </center>
     </Grid>
     <Divider/>
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
