import React from 'react';
import {withRouter} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import requiresLogin from '../../HOC/requires-login';

export class CreateChord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render(){
    return (
        <div className="App">
          <p>You are logged in!</p>
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
export default requiresLogin()(withRouter(connect(mapStateToProps)(CreateChord)));