import React from 'react';
import {withRouter} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import requiresLogin from '../../HOC/requires-login';
import Chord from './chord';
import {Chord as ChordRefactor} from './chord-refactor';
import Grid from '@material-ui/core/Grid';

export class CreateChord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render(){
    return (
        <Grid container>
          <Grid item lg={6} xs={12}>
            <Chord/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <ChordRefactor/>
          </Grid>
        </Grid>
    );
  }
  
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  authToken:state.auth.authToken,
  error:state.auth.error,
  testMode:state.auth.testMode
});
export default requiresLogin()(withRouter(connect(mapStateToProps)(CreateChord)));
