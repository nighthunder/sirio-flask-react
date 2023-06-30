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
          Dashboard de gerenciamento
        </Typography>
        {isSmallScreen ? (
          <Box sx={{ display: 'none' }}>
              <Link to="/add-profissional"><Button color="inherit">Gerenciar profissionais</Button></Link>
              <Link to="/add-type"><Button color="inherit">Gerenciar tipos</Button></Link>
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
              <Link to="/add-professional"><Button color="inherit">Gerenciar profissionais</Button></Link>
              <Link to="/add-type"><Button color="inherit">Gerenciar tipos</Button></Link>
              <Button color="inherit">Configurações</Button>
              <Button color="inherit">Sair</Button>
          </Box>
        )}
      </Toolbar>
      {isSmallScreen && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Home</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">About</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContactMailIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Sair</Typography>
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Header;
