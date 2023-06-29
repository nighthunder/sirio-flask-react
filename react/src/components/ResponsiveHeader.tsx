import React, { useState } from 'react';
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
          Painel de gerenciamento de usuários
        </Typography>
        {isSmallScreen ? (
          <Box sx={{ display: 'none' }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit">Início</Button>
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
