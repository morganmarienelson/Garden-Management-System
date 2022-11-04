import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Login from '@mui/icons-material/Login';
import LocalFloristSharpIcon from '@mui/icons-material/LocalFloristSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import MailIcon from '@mui/icons-material/Mail';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const ResponsiveAppBar = () => {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const Newopen = Boolean(anchorEl);
  const Opennew = Boolean(anchorElNoti);
  const [value, setValue] = React.useState('1');
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigatePlots = () => {
    // 👇️ navigate to /
    navigate('/Plots');
  };

  const navigateApplications = () => {
    // 👇️ navigate to /
    navigate('/Applications');
  };

  const navigateMail = () => {
    // 👇️ navigate to /
    navigate('/Mail');
  };

  const navigateForum = () => {
    // 👇️ navigate to /
    navigate('/Forum');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate('/Login');
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalFloristSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
          <Typography
            textAlign={'center'}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              ":hover": { color: 'inherit' },
            }}
          >
            Garden Manager
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button variant="text" onClick = {navigatePlots}>Plots</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button variant="text" onClick = {navigateApplications}>Applications</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button onClick = {navigateForum} variant="text" >Question Forum</Button>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            textAlign={'center'}
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Garden Manager
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={navigatePlots}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Plots
              </Button>
              <Button onClick={navigateApplications} sx={{ my: 2, color: 'white', display: 'block' }}>
                Applications
              </Button>
              <Button onClick = {navigateForum} sx={{ my: 2, color: 'white', display: 'block' }}>
                Question Forum
              </Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton >
              <MailIcon onClick = {navigateMail} sx={{ fontSize: 30, color: "white" }}/>
            </IconButton>
          <IconButton>
              <NotificationsSharpIcon onClick = {handleClickNoti} sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
              <IconButton onClick={handleClick}>
                <AccountCircleSharpIcon sx={{ fontSize: 30, color: "white"}} />
              </IconButton>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Newopen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAccountCircleSharpIcon-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },

            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <ListItemIcon>
          <AccountCircleSharpIcon fontSize="small"/> 
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
        <ListItemIcon>
          <AccountCircleSharpIcon fontSize = "small"/>
          </ListItemIcon>
           My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <ListItemButton onClick = {navigateLogin}>
          Login
          </ListItemButton>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElNoti}
        id="notification-menu"
        open={Opennew}
        onClose={handleCloseNoti}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAccountCircleSharpIcon-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },

            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="New" {...a11yProps(0)} />
          <Tab label="Dismissed" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <List sx={{width : "100%"}}>
        <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }>
          <ListItemButton>
          <ListItemIcon>
            <AccountCircleSharpIcon/>
          </ListItemIcon>
          <ListItemText>Notification</ListItemText>
          </ListItemButton>
          </ListItem>
          </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <List sx={{width : "100%"}}>
      <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }>
            <ListItemButton>
          <ListItemIcon>
            <AccountCircleSharpIcon/>
          </ListItemIcon>
          <ListItemText>Notification</ListItemText>
          </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }>
          <ListItemButton>
          <ListItemIcon>
            <AccountCircleSharpIcon/>
          </ListItemIcon>
          <ListItemText>Notification</ListItemText>
          </ListItemButton>
          </ListItem>
          </List>
      </TabPanel>
    </Box>
      </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
