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
import UserNotchCard from './UserNotches'
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
		this.openAddNotch = this.openAddNotch.bind(this)
		this.closeAddNotch = this.closeAddNotch.bind(this)
		this.openPersonalNotches = this.openPersonalNotches.bind(this)
		this.closePersonalNotches = this.closePersonalNotches.bind(this)
		

		this.state = {
			username:''	,
			loggedIn:false,
			register:false,
			firstname:'',
			lastname:'',
			personalNotchesOpened:false,
			userNotches:[]

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
			if(res.data==='unsuccessful'){

				alert("incorrect username ot password")
			} else {
				console.log("Response",res)
				alert("logged")

				this.setState({loggedIn:true})
				this.setState({firstname:res.data.firstName})
				this.setState({lastname:res.data.lastName})
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
	openPersonalNotches(){
		API.userNotches()
		.then(res =>{
			this.setState({
				userNotches:res.data,
				personalNotchesOpened: true
			})
			console.log(res.data)
			
		})

	}
	closePersonalNotches(){
		this.setState({
			personalNotchesOpened: false
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


	showLogin(){
		if(this.state.loggedIn){
			return(
				<Grid container>
				<Grid item lg={12} md={12} sm={12} xs={12} id='item-username'>
				<center>👤
				<Typography type='heading' component='h4' color='primary' style={{margin:'15px'}}>
				Welcome<br/> <span id="username">{this.state.firstname}</span><span id="lastname"> {this.state.lastname}</span>
				</Typography>
				<Grid item lg={12} md={12} sm={12} xs={12} />
				</center>
				<Divider/>
				<Grid item lg={12} md={12} sm={12} xs={12} >
				<center>
				<Button  color='primary' onClick={this.openPersonalNotches} style={{margin:'15px'}}>
				View Your Notches
				</Button>
				</center>
				<Dialog 
				onRequestClose={this.closePersonalNotches}
				open={this.state.personalNotchesOpened} 
				style={{padding: '20px'}}
				> 
				{
					this.state.userNotches.map((notch) => (
						<UserNotchCard 
						avatarLetter={notch.title[0].toUpperCase()}
						title={notch.title}
						description={notch.description}
						imgUrl={'https:/'+'/notchme.herokuapp.com/findoneimage/' + notch._id}
						timestamp={notch.date}
						/>
						))
				}
				</Dialog>
				</Grid>
				</Grid>
				
				<Grid item lg={12} md={12} sm={12} xs={12} >
				<center>
				<Button onClick={this.openAddNotch} color='primary'>
				Add new notch
				</Button>
				</center>
				<Dialog 
				onRequestClose={this.closeAddNotch} open={this.state.addNotchOpened} id='add-notch-dialog'>
				<AddNotch closeAddNotch={this.closeAddNotch} />
				</Dialog>	
				</Grid>
				<Divider />
				<center>
				<Button raised id='logout' onClick={this.logOut} color='primary' style={{margin:10}}>
				Logout
				</Button>
				</center>
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
				<Grid item lg={12} md={12} sm={12} xs={12} id='item-username'>
				<TextField fullWidth
				id='username' value={this.state.username}
				onChange={this.changeUsername}
				label='Username'
				/>
				</Grid>
				<Grid item lg={12} md={12} sm={12} xs={12} id='item-password'>
				<TextField fullWidth
				id='password' type='password' value={this.state.password}
				onChange={this.changePassword}
				label='Password'
				/>
				</Grid>
				<Grid item lg={6} md={12} sm={12} xs={12} >
				<Button raised id='btn-login' onClick={this.login} color='primary'>
				Login
				</Button>
				</Grid>
				<Grid item lg={6} md={12} sm={12} xs={12} >

				<Button raised id='btn-signup' onClick={this.handleOpen} color='primary'>
				Signup
				</Button>
				<Dialog
				open={this.state.open}
				onRequestClose={this.handleClose} id='SignUp-Modal'>
				<SignUp handleClose={this.handleClose}/>
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