import React from 'react';
import LandingPage from './components/landing-page';
import CreateChord from './components/chords/create-chord';
import CreateAdmin from './components/auth/create-admin-form';
import {Route, withRouter} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
    this.minutes = 10;
  }
  render(){
    return (
      <div className="App">
          <Route exact path="/"  render={(props) => (
              <LandingPage />)
            }/>
            <Route exact path="/create-admin"  render={(props) => (
              <CreateAdmin />)
            }/>
            <Route exact path="/create-chord"  render={(props) => (
              <CreateChord />)
            }/>
        </div>
    );
  }
  
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  authToken:state.auth.authToken,
  error:state.auth.error,
  testMode:state.auth.testMode
});
export default withRouter(connect(mapStateToProps)(App));
