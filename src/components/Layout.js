import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Container,
  Typography,
  styled,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 120,
    fontWeight: 500,
    fontSize: '1rem',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
}));

const navigationItems = [
  {
    label: '心理学知识库',
    path: '/',
    icon: <PsychologyIcon sx={{ mr: 1 }} />
  },
  {
    label: '心理咨询师工具',
    path: '/consultant-tools',
    icon: <HandshakeIcon sx={{ mr: 1 }} />
  },
  {
    label: '心理疗愈工具库',
    path: '/healing-tools',
    icon: <FavoriteIcon sx={{ mr: 1 }} />
  }
];

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={0}
        sx={{ 
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 64 }}>
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
                mr: 4
              }}
            >
              心理工具导航
            </Typography>
            
            <StyledTabs 
              value={currentPath} 
              aria-label="navigation tabs"
              sx={{ flexGrow: 1 }}
            >
              {navigationItems.map((item) => (
                <StyledTab
                  key={item.path}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                      {item.label}
                    </Box>
                  }
                  value={item.path}
                  component={RouterLink}
                  to={item.path}
                />
              ))}
            </StyledTabs>
          </Toolbar>
        </Container>
      </AppBar>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
