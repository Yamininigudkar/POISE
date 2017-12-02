import React from "react"
import { compose, withProps } from "recompose"
import API from '../../utils/API';
import { 
  Grid, Divider, Typography, TextField,
  Avatar, Paper
} from 'material-ui'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https:/"+"/maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 42.0453342, lng: -87.6716032 }}
  >
    {props.isMarkerShown &&
      props.points.map( point =>  <Marker key = {point.lat + " " + point.lng} position={{ lat: point.lat, lng: point.lng}} onClick={props.onMarkerClick} />)
     }
  </GoogleMap>
)
class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    points: []
  }

  componentDidMount() {
    this.delayedShowMarker()
    this.displayNotches()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  displayNotches=() =>{
    console.log("noch start.........")
      let points=[]
    API.getAllNotches()
    .then(notchdata => {
     
      console.log(notchdata)
      notchdata.data.map(function(point){
        console.log("here")
      
        let obj = {}
        obj.lat = point.latitude
        obj.lng = point.longitude
        points.push(obj)
      }) 
      console.log(points, "these poits")
      this.setState({points:points}) 
    })

  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        points = {this.state.points}
      />
      
    )
  }
}
export default MyFancyComponent