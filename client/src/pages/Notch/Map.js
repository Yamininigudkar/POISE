import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {compose, withProps} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const googleMapqueryUrl = "https:/"+ "/maps.googleapis.com/maps/api/js?key=AIzaSyDM80HdqN8I7OZaOY9B8MUjFa3kguMhB_E&callback=initMap"
const MyMapComponent = compose(
  withProps({
    googleMapURL:googleMapqueryUrl,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}}>
    {props.isMarkerShown && (
      <Marker
        position={{lat: -34.397, lng: 150.644}}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

export default MyMapComponent;