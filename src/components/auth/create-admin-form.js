import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
        title:'Create Admin'
    }
  }

  inputChanged = (event,key) => {
    event.persist();
    const value = event.target.value;
    this.setState({
        [key]:value
    });
}

  create = (event) => {
    event.preventDefault();
    console.log('create');
  }

  render(){
    const displayLoading = this.state.loading ? true : false;
    return (
        <div className="center-container">
                <div className="login-container center-container">
                    <form className="login-form" onSubmit={(e) => this.create(e)}>
                        <Typography variant='h4' className="form-title">{this.state.title}</Typography>
                        <div className="input-container">
                        <TextField required id="user" label="Email" variant="outlined" helperText={this.state.error ? this.state.error : ''} onChange={(e) => this.inputChanged(e,'email')}/>
                        </div>
                        <div className="input-container">
                            <TextField required id="password" label="Password" variant="outlined" type="password" helperText={this.state.error ? this.state.error : ''} onChange={(e) => this.inputChanged(e,'pass')}/>
                        </div>
                        <div className="input-container">
                            <TextField required id="password" label="Enter Password Again" variant="outlined" type="password" helperText={this.state.error ? this.state.error : ''} onChange={(e) => this.inputChanged(e,'pass2')}/>
                        </div>
                        <div className="input-container">
                            <CircularProgress className={displayLoading ? '' : 'hidden'} />
                            <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Create</Button>
                        </div>
                    </form>
                </div>
                
            </div>
    );
  }
  
}

export default CreateAdmin;
