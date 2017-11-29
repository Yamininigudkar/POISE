import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { green } from 'material-ui/colors'
import Notches from "./pages/Notch";
import Leftbar from './pages/Notch/Leftbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      500: '#37a000'
    }, 
    white: {
      500: '#ffffff'
    }
  }
})

const App = () =>
  <Router>
    <MuiThemeProvider theme={theme} >
      <Switch>
        <Route exact path="/" component={Notches} />
        <Route exact path='/leftbar' component={Leftbar} />
        <Route exact path="/search" component={Notches} />
      </Switch>
    </MuiThemeProvider>
  </Router>;

export default App;
