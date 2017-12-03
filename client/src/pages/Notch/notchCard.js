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
    width:500 
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
       <Divider />
       <img src="http://emmalyne.info/images5/0816/small-garden-landscape-design/small-garden-landscape-design-63_8.jpg" style={styles.img}/>
       </Grid>
       <Divider/>
       <Grid item lg={12} md={12} sm={12} >
       <Typography type='heading' component='p' >
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
