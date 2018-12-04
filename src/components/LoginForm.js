import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 'auto'
  },
  paper:{
    padding:theme.spacing.unit *4,
  }
});

class LoginForm extends Component {
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: ''
   };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }


  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        
        <Grid container spacing={24} justify="center" alignItems="center">
          <Paper className={classes.paper} elevation={1}>
          <Grid item xs={12}>
            <TextField  
              label="Username"
              value={this.state.username}
              onChange = {(evnt)=>{
                this.setState({username:evnt.target.value});
              }}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Password"
                type="password"
                value={this.state.password}
                onChange = {(evnt)=>{
                  this.setState({password:evnt.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                color="primary"
                label = 'Submit'
                onClick={this.handleSubmit}
                >Submit</Button>
            </Grid>
            </Paper>
          </Grid>
        
      </div>
    );
  }

  handleSubmit = (event) =>{

    axios.post('https://schweikarthome.tplinkdns.com/app/login', {username:this.state.username, password:this.state.password})
    .then(res=>{
      if(res.status === 200)
      {
        console.log(`user logged in: ${res.data.token}`);
        this.props.setToken(res.data.token);
      }else{
        console.log(`login failure: ${res}`);
      }
    })
    .catch(err => {
      console.log(JSON.toString(err));
    });
  }
}

export default withStyles(styles)(LoginForm);
