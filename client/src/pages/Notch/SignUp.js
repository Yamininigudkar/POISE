import React from 'react'

import { 
  Grid, Typography, Select,
  Divider, TextField, Button
} from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { Clear } from 'material-ui-icons'
import API from '../../utils/API';
import AlertContainer from 'react-alert'

class SignUp extends React.Component{

  constructor(props){
    super(props)
    this.changeCategory = this.changeCategory.bind(this)
    this.changefirstName = this.changefirstName.bind(this)
    this.changelastName = this.changelastName.bind(this)
    this.changeuserName = this.changeuserName.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.confirmPassword = this.confirmPassword.bind(this)
    this.signUp = this.signUp.bind(this)
    this.state = {
      category: 'first',
      firstName: '',
      lastName: '',
      username:'',
      password: '',
      confirmPassword:''
      
    }
  }


  changeCategory(event){
    this.setState({
      category: event.target.value
    })
  }

  changefirstName(event){
    this.setState({
      firstName: event.target.value
    })
  }

  changelastName(event){
    this.setState({
      lastName: event.target.value
    })
  }
  changeuserName(event){
    this.setState({
      username: event.target.value
    })
  }
  changePassword(event){
    this.setState({
      password: event.target.value
    })
  }
  confirmPassword(event){
    this.setState({
      confirmpassword: event.target.value
    })
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 9000,
    transition: 'scale'
  }

  showAlert = () => {
    this.msg.error('Passwords do not match', {
      time: 2000,
      type: 'success',
    })
  }


  signUp(event){
    event.preventDefault()
    if(this.state.password===this.state.confirmpassword)
    {
      const userData={
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        username : this.state.username,
        password : this.state.password

      }

      API.userSignUp(userData)
      .then(res => {
        console.log("Response",res)
        
      })
      .catch(err => console.log(err));

    }else {
      this.showAlert()
      return
    }
    this.props.handleClose()

  }

  render(){
    return (   
      <Grid container id='add-notch-dialog' style={{ margin: '10px'}}>
      <Grid item lg={1} md={1} sm={1} xs={1} > </Grid>
      <Grid item lg={10} md={10} sm={10} xs={10}>
      <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <center>
      <Typography type='headline' component='h1' style={{color: 'white', fontSize: '2.6em',backgroundColor: 'skyblue'}}> <em> Sign-up!!</em> </Typography>
      </center>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <Divider />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={6}>
      <FormControl fullWidth >
      <Select
      value={this.state.category}
      onChange={this.changeCategory}
      id='category' >

      <MenuItem value='first' onClick={this.changeCategory}>Mr.</MenuItem>
      <MenuItem value='second' onClick={this.changeCategory}>Mrs./Ms.</MenuItem>

      </Select>
      </FormControl>

      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Grid container>
      <Grid item lg={6} md={6} sm={6}  xs={12}>
      <TextField id='FN' value={this.state.firstName}
      fullWidth onChange={this.changefirstName} label='First Name'
      />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12} >
      <TextField id='SN' value={this.state.lastName}
      fullWidth onChange={this.changelastName} label='Last Name'
      />
      </Grid>
      </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <TextField  fullWidth id='username' value={this.state.username}
      onChange={this.changeuserName} label='Username' 
      />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <TextField fullWidth
      id='password'
      type='password' value={this.state.password}
      onChange={this.changePassword} label='password'
      rows={3}
      />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
      <TextField fullWidth type='password'
      id='confirmpassword'
      value={this.state.confirmpassword}
      onChange={this.confirmPassword} label='confirm password'
      rows={3}
      />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} >
      <center>
      <Button raised color='primary' onClick={this.signUp}>
      Submit
      </Button>
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} /> 
      </center>
      </Grid>
      </Grid>
      </Grid>
      <Grid item lg={1} md={1} sm={1} xs={1}> </Grid>
      </Grid>
      )
    }
  }

  export default SignUp
