import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Stack
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GroupsIcon from '@mui/icons-material/Groups';

const modules = [
  {
    title: '心理学知识库',
    description: '探索心理学理论、流派和专业知识，了解人类心智的奥秘',
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    link: '/knowledge',
    color: '#8B5FBF'
  },
  {
    title: '心理咨询师工具',
    description: '专业的心理咨询评估和干预工具，提升咨询效果',
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    link: '/consultant-tools',
    color: '#61398F'
  },
  {
    title: '心理疗愈工具库',
    description: '自我成长和心理健康维护工具，促进身心和谐',
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    link: '/healing-tools',
    color: '#9A73B5'
  }
];

const features = [
  {
    icon: <SearchIcon sx={{ fontSize: 30 }} />,
    title: '智能搜索',
    description: '快速找到您需要的心理学工具和资源'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 30 }} />,
    title: '专业知识',
    description: '丰富的心理学理论和实践知识库'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 30 }} />,
    title: '社区交流',
    description: '与其他专业人士分享经验和见解'
  }
];

function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          py: 8, 
          px: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 0,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${theme => theme.palette.primary.dark} 0%, ${theme => theme.palette.primary.main} 100%)`,
            opacity: 0.8,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              mb: 4,
              color: 'primary.contrastText'
            }}
          >
            心理学工具导航
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              color: 'primary.contrastText'
            }}
          >
            探索专业的心理学资源和工具，提升您的专业技能
          </Typography>
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/knowledge"
              sx={{ 
                px: 4,
                bgcolor: 'background.paper',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'background.default',
                }
              }}
            >
              开始探索
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              component={RouterLink}
              to="/consultant-tools"
              sx={{ 
                px: 4,
                borderColor: 'background.paper',
                color: 'background.paper',
                '&:hover': {
                  borderColor: 'background.default',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              查看工具
            </Button>
          </Stack>
        </Container>
      </Paper>

      {/* Main Modules */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          {modules.map((module) => (
            <Grid item xs={12} md={4} key={module.title}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme => `0 8px 24px rgba(139, 95, 191, 0.15)`,
                    bgcolor: 'background.paper',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      mb: 2,
                      color: module.color,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {module.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                  >
                    {module.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {module.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to={module.link}
                    sx={{ 
                      px: 4,
                      bgcolor: module.color,
                      '&:hover': {
                        bgcolor: theme => theme.palette.primary.dark,
                      }
                    }}
                  >
                    进入
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt: 12, mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6,
              color: 'text.primary'
            }}
          >
            为什么选择我们
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    height: '100%',
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
