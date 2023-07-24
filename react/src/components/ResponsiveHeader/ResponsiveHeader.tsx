import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {  BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import './styles.css';

const Header: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Management dashboard
        </Typography>
        {isSmallScreen ? (
          <Box sx={{ display: 'none' }}>
              <Link to="/add-profissional"><Button color="inherit">Manage users</Button></Link>
              <Link to="/add-type"><Button color="inherit">Manage classes</Button></Link>
              <Link to="/add-situation"><Button color="inherit">Manage status</Button></Link>
              <Button color="inherit">Configuration</Button>
              <Link to="/loggout"><Button color="inherit">Loggout</Button></Link>
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
              <Link to="/add-user"><Button color="inherit">Manage users</Button></Link>
              <Link to="/add-type"><Button color="inherit">Manage classes</Button></Link>
              <Link to="/add-situation"><Button color="inherit">Manage status</Button></Link>
              <Button color="inherit">Configuration</Button>
              <Link to="/loggout"><Button color="inherit">Loggout</Button></Link>
          </Box>
        )}
      </Toolbar>
      {isSmallScreen && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <Link to="/add-user"><Button color="inherit">Manage users</Button></Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <Link to="/add-type"><Button color="inherit">Manage classes</Button></Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContactMailIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Loggout</Typography>
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Header;
