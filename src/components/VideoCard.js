import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Paper, Typography, Toolbar, Checkbox } from '@material-ui/core';
import MotionMan from '@material-ui/icons/DirectionsRun';
import MotionManOutline from '@material-ui/icons/DirectionsRunOutlined';

const styles = theme => ({
  paper: {

  },
  video: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motion_enabled: false,
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={1}>
        <Toolbar>
          <Typography className={classes.grow} variant="h5" component="h5">
            {this.props.title}
          </Typography>
          <Checkbox
            icon={<MotionManOutline />}
            checkedIcon={<MotionMan />}
            checked={this.state.motion_enabled}
            onChange={this.toggleMotionEnable}
            color="primary"
          />
        </Toolbar>
        <video data-dashjs-player autoplay muted src={this.props.src} className={classes.video} controls></video>
      </Paper>
    );
  }
  toggleMotionEnable = event => {
    console.log('Toggle Motion Switch');
    this.setState({ motion_enabled: !this.state.motion_enabled })
  }
}
export default withStyles(styles)(LoginForm);

