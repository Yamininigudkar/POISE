
import React  from 'react'

import { 
  Grid, Typography, Divider, TextField,
  Button, Paper
} from 'material-ui'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import { blue } from 'material-ui/colors'
import AddNotch from './AddNotch'
import Main from './categoryfilter'
import SignUp from './SignUp'
import Login from './Login'
import { GoogleLogin } from 'react-google-login' 
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
    this.openAddNotch = this.openAddNotch.bind(this)
    this.closeAddNotch = this.closeAddNotch.bind(this)
  
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

  openAddNotch(){
    this.setState({
      addNotchOpened: true
    })
  }

  closeAddNotch(){
    this.setState({
      addNotchOpened: false
    })
  }

  
  
  render(){
    return(
      <Paper id='left-paper'>
      <Grid container id='cont-left-bar'>
      <Grid item lg={12} md={12} sm={12} id='item-logo' >
      <center>
      <Typography type='heading' component='h1' color='primary'>
      Notch
      </Typography>
      </center>
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Login/>
      </Grid>
      
      <Grid item lg={12} md={12} sm={12} >

      <Typography component='p' color='primary'>
      Or continue with google
      </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <GoogleLogin
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Google Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      />
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Button onClick={this.openGuide} color='primary'>
      How it works
      </Button>
      <Dialog 
      onRequestClose={this.closeGuide} open={this.state.guideOpened} >
      <Grid container style={{ margin: '10px'}}>
      <Grid item lg={12} md={12} sm={12} >
      <DialogTitle>This is guide!</DialogTitle>
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Grid container>
      <Grid item lg={2} md={2} sm={2} > </Grid>
      <Grid item lg={8} md={8} sm={8} >
      <Typography component='p' type='body' color='primary'>
      First move the human icon to the place where you want to add an experience. Then click on 'ADD NEW NOTCH' button. Fill in the details and click 'Add Notch'.
      </Typography>
      </Grid>
      <Grid item lg={2} md={2} sm={2} > </Grid>
      </Grid>
      </Grid>
      </Grid>
      </Dialog>
      </Grid>
      <Grid item lg={12} md={12} sm={12} >
      <Button onClick={this.openAddNotch} color='primary'>
      Add new notch
      </Button>
      <Dialog 
      onRequestClose={this.closeAddNotch} open={this.state.addNotchOpened} id='add-notch-dialog'>
      <AddNotch closeAddNotch={this.closeAddNotch} />
      </Dialog>
      <Main/>
      
      </Grid>
      </Grid>
      </Paper>
      )
  }
}

export default Leftbar

