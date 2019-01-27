import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dashjs from 'dashjs';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import VideoCard from '../components/VideoCard';

const baseURL = "https://schweikarthome.tplinkdns.com"

const styles = theme => ({
  root: {
    padding: 'auto'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

class Homepage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      token:props.token,
      armed:false,
    };
   }

  componentDidMount() {
    this.loadSystemState();
  }
  
  render() {
    const {classes} = this.props;
    const {armed} = this.state;
    return (
      <div className={classes.root}>
      <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Welcome Home
          </Typography>
          <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={armed} onChange={this.toggleArm} aria-label="LoginSwitch" />
            }
            label={armed ? 'Disarm' : 'Arm'}
          />
          </FormGroup>
          </Toolbar>
        </AppBar>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <VideoCard title="Front Door" src={baseURL+'/dash/front_door.mpd'}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <VideoCard title="Living Room" src={baseURL + '/dash/front_door.mpd'}/>
          </Grid>
        </Grid>
      </div>
    );
  }

  toggleArm = event =>{
    
    if(!this.state.armed) {
      axios.post(`${baseURL}/control/arm`)
      .then(res=>{
        if(res.status === 200)
        {
          console.log('System Armed');
          this.setState({armed:true});
        }else{
          console.log('Arming Failed');
        }
      })
      .catch(err=>{
        console.log('Failed to send arm command')
      })
    }else{
      axios.post(`${baseURL}/control/disarm`)
      .then(res=>{
        if(res.status === 200)
        {
          console.log('System Disarmed');
          this.setState({armed:false});
        }else{
          console.log('Disarming Failed');
        }
      })
      .catch(err=>{
        console.log('Failed to send disarm command')
      })
    }
  } 

  loadSystemState = () => {
    axios.get(`${baseURL}/control/state`)
      .then(res=>{
        
        this.setState({armed:res.isArmed});
      })
      .catch(err=>{
        console.log(`Failed to load system state: ${err}`)
      })
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
