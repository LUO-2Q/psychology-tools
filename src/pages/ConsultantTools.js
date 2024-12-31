import React, { useState, useMemo } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { consultantToolsData } from '../data/consultantTools';

const iconMap = {
  assessment: <AssessmentIcon />,
  intervention: <PsychologyIcon />,
  management: <EventNoteIcon />,
  supervision: <SupervisorAccountIcon />
};

function ConsultantTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredTools = useMemo(() => {
    let tools = [];
    if (activeTab === 'all') {
      Object.values(consultantToolsData).forEach(category => {
        tools = [...tools, ...category];
      });
    } else {
      tools = consultantToolsData[activeTab] || [];
    }

    return tools.filter(tool => {
      const searchString = searchTerm.toLowerCase();
      return (
        tool.title.toLowerCase().includes(searchString) ||
        tool.description.toLowerCase().includes(searchString)
      );
    });
  }, [activeTab, searchTerm]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        心理咨询师工具
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索工具..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="全部" value="all" />
          <Tab label="评估工具" value="assessment" />
          <Tab label="干预工具" value="intervention" />
          <Tab label="管理工具" value="management" />
          <Tab label="督导工具" value="supervision" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredTools.map((tool) => (
          <Grid item xs={12} md={6} key={tool.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {iconMap[tool.type]}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {tool.title}
                  </Typography>
                </Box>
                
                <Typography color="text.secondary" paragraph>
                  {tool.description}
                </Typography>

                <Chip 
                  label={`适用人群: ${tool.targetAudience}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                {tool.features && (
                  <>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      特点：
                    </Typography>
                    <List dense>
                      {tool.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {tool.usage && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      应用场景：
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {tool.usage.map((use, index) => (
                        <Chip
                          key={index}
                          label={use}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={tool.downloadLink}>
                  下载工具
                </Button>
                <Button size="small" color="secondary">
                  使用说明
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ConsultantTools;
