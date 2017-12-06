import React from 'react'

import { 
  Grid, Typography, Select,
  Divider, TextField, Button, classes
} from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { Clear, } from 'material-ui-icons'
import FileUpload from 'material-ui-icons/FileUpload';
import '../../styles/rightbar.css'
import API from '../../utils/API';




class AddNotch extends React.Component{

  constructor(props){
    super(props)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeLatitude = this.changeLatitude.bind(this)
    this.changeLongitude = this.changeLongitude.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
   //this.geolocation = this.geolocation.bind(this)
   this.changeImage = this.changeImage.bind(this)
   this.changeDescription = this.changeDescription.bind(this)
   this.addNotch = this.addNotch.bind(this)
   this.state = {
    category: ' ',
    title: '',
    description: '',
    latitude:'',
    longitude:'',
    img:''
  }
}

componentWillMount(){
  navigator.geolocation.getCurrentPosition(
    position => {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude});
    },
    error => console.log(error)
    );
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
  var file = event.target.files[0];
  this.setState({
    img: file
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
  var _this = this;
  
  const formData = new FormData()
  formData.append('file', this.state.img)
  formData.append('username', this.props.username)
  formData.append('title', this.state.title)
  formData.append('description', this.state.description)
  formData.append('latitude', this.state.latitude)
  formData.append('longitude', this.state.longitude)
  formData.append('category', this.state.category)
  const config = {
    headers: {
      'content-type':'multipart/form-data'
    }
  }

  

  
  console.log(formData, config)
  API.addNotch(formData, config)
  .then(res => {
    console.log("Response",res)

  })
  .catch(err => console.log(err));
  this.props.closeAddNotch()


}

render(){
  return (
    <Grid container id='add-notch-dialog' style={{ margin: '10px'}}>
    <Grid item lg={1} md={1} sm={1} > </Grid>
    <Grid item lg={10} md={10} sm={10} xs={10} >
    <Grid container>
    <Grid item lg={12} md={12} sm={12} >
    <center>
    <Typography type='headline' component='h1' style={{color: 'white', fontSize: '2.6em',backgroundColor: 'skyblue'}}> <em>Add a Notch</em>
    </Typography>
    </center>
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <Divider />
    </Grid>

    <Grid item lg={6} md={6} sm={6} xs={6}>
     <Typography type='headline' component='p' color='primary'> <em>Select a Category</em>
    </Typography>
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={6}>
    <FormControl fullWidth >
    <Select
    value={this.state.category}
    onChange={this.changeCategory}
    id='category'
    label='Select category' >

    
    <MenuItem value='Art' onClick={this.changeCategory}>Art</MenuItem>
    <MenuItem value='Outdoor' onClick={this.changeCategory}>Outdoor</MenuItem>
    <MenuItem value='Shows' onClick={this.changeCategory}>Shows</MenuItem>
    <MenuItem value='Sports' onClick={this.changeCategory}>Sports</MenuItem>
    <MenuItem value='Entertainment' onClick={this.changeCategory}>Entertainment</MenuItem>
    <MenuItem value='Lifestyle' onClick={this.changeCategory}>Lifestyle</MenuItem>
    <MenuItem value='Others' onClick={this.changeCategory}>Others</MenuItem>
    </Select>
    </FormControl>

    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
    <Divider />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <Grid container>
    <Grid item lg={6} md={6} sm={6} xs={6} >
    <TextField id='lat' value={this.state.latitude}
    label='latitude'
    />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={6} >
    <TextField id='lng' value={this.state.longitude}
    label='longitude'
    />
    </Grid>
    </Grid>
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <Divider />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <TextField  fullWidth id='Title' value={this.state.title}
    onChange={this.changeTitle} label='Title' 
    />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <Divider />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12} >
    <TextField multiline fullWidth
    id='experience' value={this.state.description}
    onChange={this.changeDescription} label='Description'
    rows={3}
    />
    </Grid>
    <Grid item lg={12} md={12} sm={12} xs={12}>
    
   <Typography type='heading' component='p' color='primary'> <em>Add Image</em>
    </Typography>
    <input type="file" accept="image/*" onChange={this.changeImage} />
    </Grid>
    <Grid item lg={12} md={12} sm={12} >
    <center>
    <Button raised color='primary' onClick={this.addNotch} >
    Add Notch
    </Button>
    </center>
    </Grid>
    </Grid>
    </Grid>
    <Grid item lg={1} md={1} sm={1} sm={1}> </Grid>
    </Grid>
    )
  }
}

export default AddNotch
