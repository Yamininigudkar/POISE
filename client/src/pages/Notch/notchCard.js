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
import MyFancyComponent from './Map'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const styles = {
  img:{
    width:500 ,
    height:450,
    margin:'auto'
  }
}

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https:/"+"/maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) =>
  <GoogleMap
  defaultZoom={8}
  defaultCenter={{ lat: 42.0453342, lng: -87.6716032  }}
  >
  {props.isMarkerShown && <Marker position={{ lat:props.lat, lng:props.lng }} />}
  </GoogleMap>
  )



  class NotchCard extends React.Component{

    constructor(props){
      super(props)
      this.state = {

        notchData:{},
        image:'',
        isMarkerShown:true

      }

    }

    componentWillMount(){
      console.log("data",this.props.data)
      console.log("notchdata",this.state.notchData)


      API.notchDetails(this.props.data._id)
      .then(res =>{
        console.log(res, "this came back after")
        this.setState({notchData:res.data})
        this.setState({image: 'https:/'+'/notchme.herokuapp.com/findoneimage/'+this.props.data._id})
      })


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
       <center>
       <Divider />
       <img src={this.state.image} style={styles.img}/>
       </center>
       </Grid>
       <Grid item lg={12} md={12} sm={12} >
       <MyMapComponent
       isMarkerShown={this.state.isMarkerShown}
       lat={this.state.notchData.latitude}
       lng={this.state.notchData.longitude}
       />
       </Grid>
       <Divider/>
       <Grid item lg={12} md={12} sm={12} >
       <Typography type='heading' component='h4' >
       Category: {this.state.notchData.category}
       </Typography>

       </Grid>
       <Grid item lg={12} md={12} sm={12} >
       <Typography type='heading' component='p' >
       {this.state.notchData.description}
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
