import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/center.css';
import './styles/login.css';
import { Link } from 'react-router-dom';
export class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            pass:'',
            loading:false
        }
    }

    render(){
        const displayLoading = this.props.loading ? true : false;
        return(
            <div className="login-container center-container">
                <form className="login-form" onSubmit={(e) => this.tryLogin(e)}>
                    <Typography variant='h4' className="form-title">{this.props.title}</Typography>
                    <div className="input-container">
                        <TextField required id="user" label="Email" variant="outlined" helperText={this.props.error ? 'Error Loging in' : ''} onChange={(e) => this.inputChanged(e,'email')}/>
                    </div>
                    <div className="input-container">
                        <TextField required id="password" label="Password" variant="outlined" type="password" helperText={this.props.error ? 'Error Loging in' : ''} onChange={(e) => this.inputChanged(e,'pass')}/>
                    </div>
                    <div className="input-container">
                        <CircularProgress className={displayLoading ? '' : 'hidden'} />
                        <Button className={this.displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Login</Button>
                        <Button className={this.displayLoading ? 'hidden' : 'create-button'} variant="contained" color="primary"><Link className="button-link" to="/create-admin">Create</Link></Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    loading:state.auth.loading
});
export default connect(mapStateToProps)(LoginForm);