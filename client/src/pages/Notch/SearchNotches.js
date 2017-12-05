import React from 'react'

import {
  Grid, Typography, TextField, Button
} from 'material-ui'
import { MenuItem } from 'material-ui/Menu'
//import '../styles/search_notches.css'
import axios from 'axios'
import API from '../../utils/API';
//import { $SERVER } from '../utils/server'

class SearchNotches extends React.Component{

  constructor(props){
    super(props)
    this.changeSearchCategory = this.changeSearchCategory.bind(this)
    this.changeSearchUsername = this.changeSearchUsername.bind(this)
    this.search = this.search.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.state = {

      searchCategory: ''
}
  }

  changeSearchCategory(event){
    this.setState({
      searchCategory: event.target.value
    })
  }

  changeSearchUsername(event){
    this.setState({
      searchUsername: event.target.value
    })
  }
  clearSearch(){
    this.props.setFilteredNotches([])
  }

  search(){

console.log(this.state.searchCategory)
    API.searchData(this.state.searchCategory)
    .then(searchdata =>{
      console.log("searchdata",searchdata)
      this.props.setFilteredNotches(searchdata.data)
  })
}
  render(){
    return (
      <Grid container>
      <Grid item lg={12} md={12} sm={12} >
      <Grid container>
      <Grid item lg={2} md={2} sm={2} xs={3} >
      <center>
      <Typography component='p' type='body' style={{marginTop: '18px'}}>
      SEARCH BY
      </Typography>
      </center>
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={4}>
      <TextField fullWidth select
      id='search-by'
      value={this.state.searchCategory}
      onChange={this.changeSearchCategory}
      label='search by category'
      >

      
      <MenuItem key='art' value='Art'>Art</MenuItem>
      <MenuItem key='shows' value='Shows'>Shows</MenuItem>
      <MenuItem key='sports' value='Sports'>Sports</MenuItem>
      <MenuItem key='animal' value='Animal'>Animal</MenuItem>
      <MenuItem key='outdoor' value='Outdoor'>Outdoor</MenuItem>
      <MenuItem key='lifestyle' value='Lifestyle'>Lifestyle</MenuItem>

      </TextField>
      </Grid>
      
      <Grid item lg={4} md={4} sm={4} xs={3}>
      <Button raised id='search-button'
      color='primary' onClick={this.search}>
      Search
      </Button>
      <Button raised id='search-button'
      color='primary' onClick={this.clearSearch}>
      Clear Search
      </Button>
      </Grid>
      
      </Grid>
      </Grid>
      </Grid>
      )
  }
}

export default SearchNotches