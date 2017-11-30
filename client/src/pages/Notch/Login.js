
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
import '../../styles/leftbar.css'
import API from '../../utils/API';


class Login extends React.Component{

	constructor(props){
		super(props)
		this.changeUsername = this.changeUsername.bind(this)
		this.changePassword = this.changePassword.bind(this)
		this.login = this.login.bind(this)
		this.logOut = this.logOut.bind(this)
		this.signup = this.signup.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = {
			username:''	,
			loggedIn:false,
			register:false

		}
	}


	changeUsername(event){
		this.setState({
			username: event.target.value
		})
	}

	changePassword(event){
		this.setState({
			password: event.target.value
		})
	}

	login(event){
		console.log('going to login')
		event.preventDefault()
		const userData={
			username : this.state.username,
			password : this.state.password
		}
		console.log("login")
		console.log(userData)
		API.userLogin(userData)
		.then(res => 
		{
			if(res){
				console.log("Response",res)
				alert("logged")
				this.setState({loggedIn:true})
			} 
		})

		.catch(err => console.log(err));
	}


	signup(){
		console.log('going to signup')
	}

	handleOpen(){
		this.setState({open: true});
	};

	handleClose(){
		this.setState({open: false});
	};

	logOut(){
		API.userlogOut()
		.then(res =>{
			console.log(res)
			console.log("Logout successful")
			this.setState({loggedIn:false})
			this.setState({username:""})
			this.setState({password:""})
		})

	}

	showLogin(){
		if(this.state.loggedIn){
			return(
				<Grid container>
				<Grid item lg={12} md={12} sm={12} id='item-username'>
				<center>
				<Typography type='heading' component='h4' color='primary'>
				Welcome <span id="username">{this.props.username}</span>
				</Typography>
				</center>
				<Divider />
				<center>
				<Button raised id='logout' onClick={this.logOut} color='primary'>
				Logout
				</Button>
				</center>
				</Grid>
				<Grid item lg={12} md={12} sm={12} >
      <Button onClick={this.openAddNotch} color='primary'>
      Add new notch
      </Button>
      <Dialog 
      onRequestClose={this.closeAddNotch} open={this.state.addNotchOpened} id='add-notch-dialog'>
      <AddNotch closeAddNotch={this.closeAddNotch} />
      </Dialog>
      
      
      </Grid>
				</Grid>

				)


		}else if(this.state.register){
			return (
				<div>Registered</div>
				)
		}


		else {
			return(
				<Grid container>
				<Grid item lg={12} md={12} sm={12} id='item-username'>
				<TextField fullWidth
				id='username' value={this.state.username}
				onChange={this.changeUsername}
				label='Username'
				/>
				</Grid>
				<Grid item lg={12} md={12} sm={12} id='item-password'>
				<TextField fullWidth
				id='password' type='password' value={this.state.password}
				onChange={this.changePassword}
				label='Password'
				/>
				</Grid>
				<Grid item lg={6} md={6} sm={6} >
				<Button raised id='btn-login' onClick={this.login} color='primary'>
				Login
				</Button>
				</Grid>
				<Grid item lg={6} md={6} sm={6} >

				<Button raised id='btn-signup' onClick={this.handleOpen} color='primary'>
				Signup
				</Button>
				<Dialog
				open={this.state.open}
				onRequestClose={this.handleClose} id='SignUp-Modal'>
				<SignUp handleclose={this.handleClose}/>
				</Dialog>
				</Grid>
				</Grid>
				)

		}
	}
	render() {
		return (
			<div>
			{this.showLogin()}
			</div>
			)
	}




}

export default Login

