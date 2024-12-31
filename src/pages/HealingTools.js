import React, { useState, useMemo } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Rating,
  LinearProgress,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { healingToolsData } from '../data/healingTools';

const difficultyColor = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error'
};

const difficultyText = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级'
};

const difficultyValue = {
  beginner: 33,
  intermediate: 66,
  advanced: 100
};

function HealingTools() {
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const tools = useMemo(() => {
    let allTools = [];
    if (activeTab === 'all') {
      Object.values(healingToolsData).forEach(category => {
        allTools = [...allTools, ...category];
      });
    } else {
      allTools = healingToolsData[activeTab] || [];
    }
    return allTools;
  }, [activeTab]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        心理疗愈工具库
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="全部" value="all" />
          <Tab label="冥想" value="meditation" />
          <Tab label="放松" value="relaxation" />
          <Tab label="情绪" value="emotional" />
          <Tab label="认知" value="cognitive" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} md={6} key={tool.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PlayCircleOutlineIcon color="primary" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {tool.title}
                  </Typography>
                  <IconButton 
                    sx={{ ml: 'auto' }}
                    onClick={() => toggleFavorite(tool.id)}
                    color={favorites.has(tool.id) ? 'secondary' : 'default'}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
                
                <Typography color="text.secondary" paragraph>
                  {tool.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimerIcon sx={{ mr: 1 }} color="action" />
                  <Typography variant="body2">
                    {tool.duration} 分钟
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    难度等级：{difficultyText[tool.difficulty]}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={difficultyValue[tool.difficulty]}
                    color={difficultyColor[tool.difficulty]}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                {tool.benefits && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      练习效果：
                    </Typography>
                    <List dense>
                      {tool.benefits.map((benefit, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={benefit} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                <Divider sx={{ my: 2 }} />

                {tool.instructions && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      练习步骤：
                    </Typography>
                    <List dense>
                      {tool.instructions.map((instruction, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={instruction} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Rating value={tool.popularity} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {tool.popularity}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                {tool.audioLink && (
                  <Button size="small" color="primary" href={tool.audioLink}>
                    播放音频
                  </Button>
                )}
                {tool.videoLink && (
                  <Button size="small" color="primary" href={tool.videoLink}>
                    观看视频
                  </Button>
                )}
                {tool.downloadLink && (
                  <Button size="small" color="primary" href={tool.downloadLink}>
                    下载资料
                  </Button>
                )}
                <Button size="small" color="secondary">
                  收藏工具
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HealingTools;
