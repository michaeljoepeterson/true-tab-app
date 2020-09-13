import React from 'react';
import {withRouter} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import requiresLogin from '../../HOC/requires-login';
import Chord from './chord';
import Grid from '@material-ui/core/Grid';

export class CreateChord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote:null
    }
  }

  fretClicked = (note) => {
    this.setState({
      selectedNote:note
    });
  }
  //chord selectors here then feed chord to chord component
  render(){
    let note = this.state.selectedNote ? (
    <div style={{textAlign:'center',width:'100%'}}>
      <p>The last selected note is {this.state.selectedNote}</p>
    </div>) : null;
    return (
        <Grid container>
          <Grid item lg={6} xs={12}>
            <Chord fretClickHandler={this.fretClicked}/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Chord fret={5} fretClickHandler={this.fretClicked}/>
          </Grid>
          {note}
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
