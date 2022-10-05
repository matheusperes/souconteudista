// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Router } from '#shared/routes';

import { useTitle } from '../../hooks/title';
import Home from '../../images/Home.svg';
import Vector from '../../images/Librarybooks.svg';
import Logo2 from '../../images/logo_sistema2.png';
import Vector4 from '../../images/Paper.svg';

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const { title } = useTitle();
  const [open, setOpen] = useState(false);

  const handleDrawerChange = useCallback(() => {
    setOpen((oldValue) => !oldValue);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: 'white', color: '#000000' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerChange} edge="start" sx={{ mr: 2 }}>
            {open ? <MenuIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#020560',
            color: 'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            background: '#020560',
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <img width="218px" src={Logo2} alt="Sou Conteudista" />
          </Box>
        </DrawerHeader>
        <Divider sx={{ background: '#9193b95d', height: '0.25rem' }} />
        <List sx={{ background: '#020560', color: 'white', marginTop: '3.43rem' }}>
          <ListItem onClick={() => navigate('/')}>
            <ListItemButton>
              <ListItemIcon>
                <Icon>
                  <img src={Home} alt="Home" />
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate('/cursos')}>
            <ListItemButton>
              <ListItemIcon>
                <Icon>
                  <img src={Vector4} alt="Cursos" />
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Cursos" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate('/disciplinas')}>
            <ListItemButton>
              <ListItemIcon>
                <Icon>
                  <img src={Vector} alt="Disciplinas" />
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Disciplinas" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} sx={{ background: '#E5E5E5' }}>
        <DrawerHeader />

        <Router />
      </Main>
    </Box>
  );
}
