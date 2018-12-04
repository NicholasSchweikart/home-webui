import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import dashjs from 'dashjs';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 'auto'
  },
  video:{
    width: '100%',
  },
  paper:{

  }
});

class Homepage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      token:props.token,
    };
   }

  componentDidMount() {
    let url = "https://schweikarthome.tplinkdns.com/dash/front_door.mpd";
    let player = dashjs.MediaPlayer().create();
    // player.extend('RequestModifier', ()=>{
    //   return {
    //     modifyRequestHeader: xhr => {
    //       xhr.setRequestHeader('Authorization','Bearer ' + this.state.token);
    //       return xhr;
    //     },
    //     modifyRequestURL: url => {
    //       return URL;
    //     }
    //   }
    // }, true);
    
    player.initialize(document.querySelector("#videoPlayer"), url, true);
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            Front Door
          </Typography>
          <video id='videoPlayer' className={classes.video} controls></video>
        </Paper>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
