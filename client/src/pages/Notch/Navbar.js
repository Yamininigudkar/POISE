import React from 'react'

import { 
  Grid, AppBar, Toolbar, Avatar
} from 'material-ui'
import SearchNotches from './SearchNotches'
import '../../styles/navbar.css'

class Navbar extends React.Component{

  constructor(props){
    super(props)

    this.state = {
    }
  }

  render(){
    return (
      <AppBar position="static" id='appbar' color='white'>
      <Toolbar disableGutters>
      <Grid container>
      <Grid item lg={2} md={2} sm={2} xs={2} >
      <img  id='avatar-logo' src="http://www.heliheyn.de/Maps/Video/TransparentGlobe.gif" />
      
      
      </Grid>
      <Grid item lg={10} md={10} sm={10} xs={5}>
      
      <SearchNotches setFilteredNotches={this.props.setFilteredNotches}/>
      </Grid>
      <Grid item lg={2} md={2} sm={2} xs={2} > </Grid>
      </Grid>
      </Toolbar>
      </AppBar>
      )
    }
  }

  export default Navbar
