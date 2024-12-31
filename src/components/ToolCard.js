import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  styled,
  CardMedia,
  Chip,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LanguageIcon from '@mui/icons-material/Language';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.background.default}`,
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 24px rgba(139, 95, 191, 0.15)`,
    '& .preview-image': {
      opacity: 1,
      transform: 'translateY(0)',
      visibility: 'visible',
    },
  },
}));

const PreviewImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '50%',
  transform: 'translateX(-50%) translateY(-10px)',
  width: '90%',
  maxWidth: '300px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  padding: theme.spacing(1),
  boxShadow: `0 4px 20px rgba(139, 95, 191, 0.15)`,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    border: '8px solid transparent',
    borderBottomColor: theme.palette.background.paper,
  },
}));

const ToolIcon = styled('img')({
  width: 40,
  height: 40,
  objectFit: 'contain',
});

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

const ToolCard = ({ 
  icon, 
  title, 
  description, 
  previewImage, 
  language = 'zh',
  tags = [],
  url = '#',
  isPro = false,
}) => {
  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 2 }}>
            <ToolIcon src={icon} alt={title} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {language === 'en' && (
                <Tooltip title="English">
                  <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </Tooltip>
              )}
              {isPro && (
                <Chip 
                  label="Pro" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    height: 20,
                    fontSize: '0.75rem',
                  }} 
                />
              )}
            </Box>
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {description}
        </Typography>

        <TagsContainer>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                bgcolor: 'background.default',
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            />
          ))}
        </TagsContainer>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="收藏">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="分享">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          endIcon={<OpenInNewIcon />}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.light',
            },
          }}
        >
          访问
        </Button>
      </CardActions>

      {previewImage && (
        <PreviewImage className="preview-image">
          <CardMedia
            component="img"
            image={previewImage}
            alt={`${title} preview`}
            sx={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px',
            }}
          />
        </PreviewImage>
      )}
    </StyledCard>
  );
};

export default ToolCard;
