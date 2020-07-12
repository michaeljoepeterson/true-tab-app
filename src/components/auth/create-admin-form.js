import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {createAdmin} from '../../actions/authActions';
import SnackbarWrapper from '../snackbar-wrapper';
import { Link } from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import '../styles/center.css';

export class CreateAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        pass:'',
        pass2:'',
        loading:false,
        error:null,
        title:'Create Admin',
        saved:false,
        savedMessage:'User Created'
    }
  }

  inputChanged = (event,key) => {
    event.persist();
    const value = event.target.value;
    this.setState({
        [key]:value
    });
  }

  openSnackBar = (message) => {
    message = message ? message : this.state.savedMessage;
    this.setState({
      saved:true,
      savedMessage:message
    });
  }

  create = (event) => {
    event.preventDefault();
    console.log('create');
    if(this.state.pass === this.state.pass2){
      this.setState({
        error:null
      });

      this.props.dispatch(createAdmin(this.state.email,this.state.pass))

      .then(res => {
        this.openSnackBar('User Created');
      })

      .catch(err => {
        console.log('final error catch',err);
        //this.openSnackBar(err.message);
      })
    }
    else{
      this.setState({
        error:'Passwords do not match'
      });
    }
  }

  snackbarClosed = (name) => {
    this.setState({
        [name]:false
    });
  }

  render(){
    const displayLoading = this.props.loading ? true : false;
    const error = this.state.error ? this.state.error : this.props.error;
    return (
        <div className="center-container">
          <div className="login-container center-container">
              <form className="login-form" onSubmit={(e) => this.create(e)}>
                  <Typography variant='h4' className="form-title">{this.state.title}</Typography>
                  <div className="input-container">
                  <TextField required id="user" label="Email" variant="outlined" helperText={error ? error : ''} onChange={(e) => this.inputChanged(e,'email')}/>
                  </div>
                  <div className="input-container">
                      <TextField required id="password" label="Password" variant="outlined" type="password" helperText={error ? error : ''} onChange={(e) => this.inputChanged(e,'pass')}/>
                  </div>
                  <div className="input-container">
                      <TextField required id="password" label="Enter Password Again" variant="outlined" type="password" helperText={error ? error : ''} onChange={(e) => this.inputChanged(e,'pass2')}/>
                  </div>
                  <div className="input-container">
                    <Link className="button-link" to="/">
                      <Button className={this.displayLoading ? 'hidden' : 'login-button'} variant="contained" color="primary">Login</Button></Link>
                      <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Create</Button>
                      <div className='progress-spinner'>
                            <CircularProgress className={displayLoading ? '' : 'hide'} size={55}/>
                        </div>
                  </div>
              </form>
          </div>
          <SnackbarWrapper saved={this.state.saved} snackbarClosed={this.snackbarClosed} saveField={"saved"} savedMessage={this.state.savedMessage}/>
        </div>
    );
  }
  
}

const mapStateToProps = state => ({
  error:state.auth.error,
  loading:state.auth.loading
});
export default connect(mapStateToProps)(CreateAdmin);

//export default CreateAdmin;
