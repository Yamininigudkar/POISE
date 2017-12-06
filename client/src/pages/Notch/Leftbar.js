
import React  from 'react'
import { 
  Grid, Typography, Divider, TextField,
  Button, Paper
} from 'material-ui'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import { blue } from 'material-ui/colors'
import AddNotch from './AddNotch'
import SignUp from './SignUp'
import Login from './Login'
import '../../styles/leftbar.css'
import API from '../../utils/API';



const responseGoogle = response => {
  console.log(response);
};

class Leftbar extends React.Component{

  constructor(props){
    super(props)
    this.openGuide = this.openGuide.bind(this)
    this.closeGuide = this.closeGuide.bind(this)
    this.state = {

    }
  }

  openGuide(){
    this.setState({
      guideOpened: true,
    })
  }

  closeGuide(){
    this.setState({
      guideOpened: false,
    })
  }

  
  
  render(){
    return(
      <Paper id='left-paper'>
      <Grid container id='cont-left-bar'>
      <Grid item lg={12} md={12} sm={12} xs={12} id='item-logo' >
      <center>
      <Typography type='heading' component='h4' style={{color: '#3CB371',fontSize : '2.6em',backgroundColor: 'skyblue'}}> <em>Notch📍</em>
      </Typography>
      </center>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <Login/>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <Button onClick={this.openGuide} color='primary'>
      How it works
      </Button>
      <Dialog 
      onRequestClose={this.closeGuide} open={this.state.guideOpened} >
      <Grid container style={{ margin: '10px'}}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
    
      <Typography type='headline' component='h1' style={{color: 'white',backgroundColor: 'skyblue'}}> <em>This is guide!</em> </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Grid container>
      <Grid item lg={2} md={2} sm={2} > </Grid>
      <Grid item lg={8} md={8} sm={8} xs={8} >
      <Typography component='p' type='body' color='primary'>
      To add a notch allow browser to access your location.Then click on 'ADD NEW NOTCH' button. Fill in the details and click 'Add Notch'.
      </Typography>
      </Grid>
      <Grid item lg={2} md={2} sm={2} xs={2}> </Grid>
      </Grid>
      </Grid>
      </Grid>
      </Dialog>
      
      </Grid>
      
      </Grid>
      </Paper>
      )
  }
}

export default Leftbar

