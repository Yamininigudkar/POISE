import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {compose, withProps} from 'recompose';
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import Google from './Google';
import { Grid } from 'material-ui'
import Leftbar from './Leftbar'
import AddNotch from './AddNotch'
import NotchesList from './NotchesList'
import Navbar from './Navbar'
import '../../styles/Notch.css'
import MyFancyComponent from './Map'
import NotchCard from './notchCard'
import Main from './categoryfilter'




class Notch extends React.PureComponent {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {

    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true});
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false});
    this.delayedShowMarker();
  };

  render() {
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Navbar />
        </Grid>
          <Grid item lg={2} md={6} sm={12} xs={12} id='left-bar-col'>
          <Leftbar />
          <Grid >
          <Main/>
          </Grid>
          
        </Grid> 
        <Grid item lg={7} md={6} sm={12} xs={12} id='mid-col'>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} >
              <MyFancyComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
              />
            </Grid>
          </Grid>
        </Grid>
                
        <Grid item lg={3} md={10} sm={12} xs={12} id='right-bar-col'>
          <NotchesList />
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}> </Grid>
      </Grid>
    );
  }
}

export default Notch;
