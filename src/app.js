import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import Homepage from './pages/homepage';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const baseURL = "https://schweikarthome.tplinkdns.com"

const styles = theme => ({
  root: {
    
  },
  appBar:{
    
  },
  container:{
    padding: theme.spacing.unit * 1,
    paddingTop:theme.spacing.unit *10,
  },
  grow:{
    flexGrow: 1,
  }
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loggedIn: true,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Login For Access
            </Typography>
          </Toolbar>
        </AppBar>
        
        <div className={classes.container}>
          {!this.state.loggedIn &&  <LoginForm setToken={this.setToken}/>}
          {this.state.loggedIn &&  <Homepage token={this.state.token}/>}
        </div>
      
      </div>
    );
  }

  setToken = (token) =>{
    console.log(`Setting token...`);
    this.setState({token:token, loggedIn:true});
  }

  checkAuth = () => {
    console.log('checking authorization...');
    axios.get(`${baseURL}/auth`)
    .then(res=>{
      if(res.status === 200)
      {
        console.log('cookie valid lets go');
        this.setState({loggedIn:true});
      }
    })
    .catch(err => {
        console.log('Cookie stale or gone...')
    });
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
