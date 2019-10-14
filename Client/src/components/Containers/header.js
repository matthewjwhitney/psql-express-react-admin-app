import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ASYNC_ACTIONS from '../../store/actions/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';




class Header extends Component {
    constructor(props) {
      super(props)

      this.state = {
        isOpen: false,
        anchorEl: null
      }
    }

    handleOpen = () => {
      this.setState({ isOpen: true });
    };

    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget, isOpen: true })
    };

    handleClose = () => {
      this.setState({ isOpen: false, anchorEl:null });
    };

 render() {
    const isOpen = this.state.isOpen
    const anchorEl = this.state.anchorEl
    const open = Boolean(isOpen)

    return (
    <div className="FlexRow">
      <AppBar postion="static">
        <Toolbar>
          <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="primary"
                aria-label="Menu">
            <span style={{ marginTop: 5, marginLeft: -12, marginRight: 20, color: 'white'}}><MenuIcon /></span>
          </IconButton>
        <Typography align="left"  variant="display1" >
         <span style={{color:'white'}}> React Redux Admin App </span>
         </Typography>
          <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={() => this.handleClose()}>


          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem button={true} onClick={() => this.handleClose()}>
              Home
            </MenuItem>
          </Link>

          <Link to="/profile" style={{ textDecoration: 'none' }}>
           <MenuItem button={true} onClick={() => this.handleClose()}>
              Admin Dashboard
           </MenuItem>
          </Link>

           <Link to="/posts" style={{ textDecoration: 'none' }}>
            <MenuItem button={true} onClick={() => this.handleClose()}>
              Get Posts
            </MenuItem>
           </Link>


           <Link to="/users" style={{ textDecoration: 'none' }}>
            <MenuItem button={true} onClick={() => this.handleClose()}>
              Get Users
            </MenuItem>
           </Link>

          </Menu>
          <div style={{marginLeft: 'auto'}}>
          { !this.props.isAuthenticated
            ? <Button variant="contained" color="primary" onClick={() => this.props.auth.login()}>
                <span style={{paddingRight: '5px'}}>Login</span> </Button>
            : <Button variant="contained" color="primary" onClick={() => this.props.auth.logout()}> Logout </Button>
          }
          </div>
          </Toolbar>
        </AppBar>
      </div>
    )}
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth_reducer.isAuthenticated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ASYNC_ACTIONS.login_success()),
    login_failure:  () => dispatch(ASYNC_ACTIONS.login_failure())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
