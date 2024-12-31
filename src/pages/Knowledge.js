import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Grid,
  Box,
  Container,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import { knowledgeResources } from '../data/knowledgeResources';

const categories = [
  { id: 'all', label: '全部资源' },
  { id: 'academic', label: '学术研究' },
  { id: 'journals', label: '专业期刊' },
  { id: 'associations', label: '专业协会' },
  { id: 'education', label: '学习教育' },
  { id: 'practical', label: '实践应用' },
  { id: 'special', label: '特色专题' },
];

function Knowledge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const filteredResources = useMemo(() => {
    let resources = [];
    
    // 获取所有资源或特定类别的资源
    if (activeCategory === 'all') {
      Object.values(knowledgeResources).forEach(category => {
        resources = [...resources, ...category];
      });
    } else {
      resources = knowledgeResources[activeCategory] || [];
    }

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      resources = resources.filter(resource => 
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return resources;
  }, [activeCategory, searchTerm]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 4,
            color: 'text.primary',
            fontWeight: 'bold'
          }}
        >
          心理学知识资源库
        </Typography>

        {/* 搜索框 */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索资源..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* 分类标签页 */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map(category => (
              <Tab 
                key={category.id}
                label={category.label}
                value={category.id}
                sx={{ 
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 3
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* 资源列表 */}
        <Grid container spacing={1.5}>
          {filteredResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={resource.id}>
              <Card 
                component="a"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 20px rgba(139, 95, 191, 0.08)',
                    borderColor: 'primary.light',
                    '& .image-placeholder': {
                      bgcolor: 'primary.light',
                      opacity: 0.1,
                    },
                    '& .resource-overlay': {
                      opacity: 1,
                    }
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {/* 图片占位区域 */}
                <Box
                  className="image-placeholder"
                  sx={{
                    width: '100%',
                    height: 120,
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '25%',
                      height: '25%',
                      bgcolor: 'grey.200',
                      opacity: 0.5,
                      borderRadius: '8px'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '12%',
                      height: '12%',
                      bgcolor: 'grey.300',
                      opacity: 0.5,
                      borderRadius: '4px'
                    }
                  }}
                />

                {/* 悬停时显示的遮罩层 */}
                <Box
                  className="resource-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(139, 95, 191, 0.03) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />

                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 1.5, 
                  pb: '12px !important',
                  '&:last-child': { pb: '12px !important' }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1,
                    gap: 0.5
                  }}>
                    <Typography 
                      variant="subtitle1" 
                      component="h3" 
                      sx={{ 
                        flexGrow: 1,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        lineHeight: 1.4,
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {resource.title}
                    </Typography>
                    {resource.language === 'en' && (
                      <Tooltip 
                        title="English" 
                        placement="top"
                        arrow
                      >
                        <LanguageIcon 
                          sx={{ 
                            flexShrink: 0,
                            color: 'text.secondary',
                            fontSize: 14
                          }} 
                        />
                      </Tooltip>
                    )}
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 1,
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '38px',
                      opacity: 0.85
                    }}
                  >
                    {resource.description}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 0.5,
                    mt: 'auto'
                  }}>
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          height: '18px',
                          fontSize: '0.6875rem',
                          bgcolor: 'background.default',
                          color: 'text.secondary',
                          '& .MuiChip-label': {
                            px: 0.75
                          },
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'primary.main'
                          },
                        }}
                      />
                    ))}
                    {resource.tags.length > 3 && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.6875rem',
                          lineHeight: '18px',
                          opacity: 0.8
                        }}
                      >
                        +{resource.tags.length - 3}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Knowledge;
