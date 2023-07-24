import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import './styles.css';

const useStyles = {
  footer: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '16px',
  },
  menuButton: {
    marginRight: '16px',
  },
  drawer: {
    width: '200px',
  },
};

const Footer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="fixed" style={useStyles.footer}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Maya development
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={useStyles.menuButton}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <div
            style={useStyles.drawer}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <Link to="/add-user"><ListItemText primary="Manage users" /></Link>
              </ListItem>
              <ListItem button>
                <Link to="/add-type"><ListItemText primary="Manage classes" /></Link>
              </ListItem>
              <ListItem button>
                <Link to="/add-situation"><ListItemText primary="Manage status" /></Link>
              </ListItem>
              <ListItem button>
                <Link to="/loggout"><ListItemText primary="Loggout" /></Link>
              </ListItem>
              
            </List>
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
