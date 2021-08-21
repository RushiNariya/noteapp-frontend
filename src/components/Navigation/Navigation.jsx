import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
import './Navigation.css';
import SearchBox from '../SearchBox/SearchBox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation() {
  const classes = useStyles();
  const { token, userId } = useContext(GlobalContext);

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className="appbar" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/notes" className="navlink" exact>
              Notes
            </NavLink>
          </Typography>
          {token ? <SearchBox /> : null}
          {token ? (
            <>
              <>
                <Button color="inherit">
                  <NavLink to="/addnote" className="navlink" exact>
                    <strong> Add Note</strong>
                  </NavLink>
                </Button>
              </>

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="navlink"
              >
                Account
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink to={`myprofile/${userId}`} exact>
                    <strong> My Profile</strong>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/logout" exact>
                    <strong> Logout</strong>
                  </NavLink>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" variant="outlined">
                <NavLink to="/" className="navlink" exact>
                  <strong> Login</strong>
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/addUser" className="navlink" exact>
                  <strong> Register</strong>
                </NavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
