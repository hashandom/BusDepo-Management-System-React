import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useNavigate } from 'react-router-dom';
import { AirlineSeatReclineNormal, AltRoute, Assessment, BusAlert, Logout, People, Receipt, Report, Settings } from '@mui/icons-material';
import readToken from '../Api/tokenReader';
import { Button, Snackbar } from '@mui/material';
import TokenInfoDisplay from '../Api/TokenInfoDisplay';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [groupManageOpen, setGroupManageOpen] = React.useState(false);
  const [groupReportOpen, setGroupReportOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    !localStorage.getItem('token') != "" && navigate('/login')
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            width={'100%'}
          >
            Depot Management System
          </Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<Logout/>}
            onClick={() => {
              navigate("/login")
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
            <Box
              component="img"
              src="/Super3Logo.svg"
              maxHeight={40}
            />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="DashBoard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider />
         
          <ListItem
            disablePadding
            onClick={() => {
              setGroupManageOpen(!groupManageOpen)
            }}
            sx={{
              background: groupManageOpen ? "whitesmoke" : "white"
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Settings/>
              </ListItemIcon>
              <ListItemText
                primary="Management"
              />
            </ListItemButton>
          </ListItem>

          {groupManageOpen ? <>
            <List disablePadding sx={{background:"whitesmoke"}}>
              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/manage/employees")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <People/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Employees"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/manage/drivers")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AirlineSeatReclineNormal/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Drivers"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/manage/conductors")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Receipt/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Conductors"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/manage/routes")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AltRoute/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Routes"
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/manage/trips")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BusAlert/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Trips"
                  />
                </ListItemButton>
              </ListItem>

            </List>
          </> : <></>}

          <ListItem
            disablePadding
            onClick={() => {
              setGroupReportOpen(!groupReportOpen)
            }}
            sx={{
              background: groupReportOpen ? "whitesmoke" : "white"
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary="Reports"
              />
            </ListItemButton>
          </ListItem>

          {groupReportOpen ? <>
            <List disablePadding sx={{background:"whitesmoke"}}>
              <ListItem
                disablePadding
                sx={{
                  background:"white",
                  marginLeft:'10px'
                }}
                onClick={() => {
                  navigate("/report/route")
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <People/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Route Performance"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </> : <></>}


        </List>
      </Drawer>
      
      <TokenInfoDisplay/>
    </Box>
    
  );
}
