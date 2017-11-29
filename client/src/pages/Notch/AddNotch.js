import React from 'react'

import { 
  Grid, Typography, Select,
  Divider, TextField, Button
} from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { Clear } from 'material-ui-icons'
import '../../styles/rightbar.css'
import API from '../../utils/API';

class AddNotch extends React.Component{

  constructor(props){
    super(props)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeLatitude = this.changeLatitude.bind(this)
    this.changeLongitude = this.changeLongitude.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeImage = this.changeImage.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.addNotch = this.addNotch.bind(this)
    this.state = {
      category: 'first',
      title: '',
      description: '',
      img:''
    }
  }

  changeCategory(event){
    this.setState({
      category: event.target.value
    })
  }

  changeLatitude(event){
    this.setState({
      latitude: event.target.value
    })
  }

  changeLongitude(event){
    this.setState({
      longitude: event.target.value
    })
  }
  changeImage(event){
    this.setState({
      img: event.target.value
    })
  }
  changeTitle(event){
    this.setState({
      title: event.target.value
    })
  }
  changeDescription(event){
    this.setState({
      description: event.target.value
    })
  }

  addNotch(){
    const notchData = {
      title:this.state.title,
      category:this.state.category,
      description:this.state.description,
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      img:this.state.img

    }
    API.addNotch(notchData)
    .then(res => {
        console.log("Response",res)
        
    })
      .catch(err => console.log(err));
    
    
  }

  render(){
    return (
      <Grid container id='add-notch-dialog' style={{ margin: '10px'}}>
        <Grid item lg={1} md={1} sm={1} > </Grid>
        <Grid item lg={10} md={10} sm={10} >
          <Grid container>
            <Grid item lg={12} md={12} sm={12} >
                  <center>
                    <Typography type='heading' component='h1' color='primary'>
                      Add a Notch
                    </Typography>
                  </center>
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Divider />
            </Grid>

            <Grid item lg={6} md={6} sm={6} >
              <Typography component='h3' type='body'>
                Category
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} >
              <FormControl fullWidth >
                <Select
                  value={this.state.category}
                  onChange={this.changeCategory}
                  id='category' >

                  <MenuItem value='first' onClick={this.changeCategory}>First</MenuItem>
                  <MenuItem value='second' onClick={this.changeCategory}>Second</MenuItem>
                  <MenuItem value='third' onClick={this.changeCategory}>Third</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Grid container>
                <Grid item lg={6} md={6} sm={6} >
                  <TextField id='lat' value={this.state.latitude}
                    fullWidth onChange={this.changeLatitude} label='latitude'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} >
                  <TextField id='lng' value={this.state.longitude}
                    fullWidth onChange={this.changeLongitude} label='longitude'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <TextField  fullWidth id='Title' value={this.state.title}
                onChange={this.changeTitle} label='Title' 
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <TextField multiline fullWidth
                id='experience' value={this.state.description}
                onChange={this.changeDescription} label='Description'
                rows={3}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <TextField fullWidth
                id='image' value={this.state.image}
                onChange={this.changeImage} label='image'
                rows={3}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <center>
                <Button raised color='primary' onClick={this.addNotch}>
                  Add Notch
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} sm={1} > </Grid>
      </Grid>
    )
  }
}

export default AddNotch
