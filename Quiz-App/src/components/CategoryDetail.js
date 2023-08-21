import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Questions from './Questions';

function CategoryDetail(props) {
  const { category } = props;
  const [showQuestions, setShowQuestions] = useState(false);

  const handleButtonClick = () => {
    setShowQuestions((prevState) => !prevState);
  };

  const getCategoryCategoryId = (apiLink) => {
    return apiLink.match(/category=(\d+)/)[1];
  };

  return (
    <Card style={{ margin: '10px', flex: '0 0 calc(50% - 20px)' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={category.src}
          alt={category.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={NavLink}
          id="viewQuestions"
          to={`/${category.name}/${getCategoryCategoryId(category.apiLink)}`}
          sx={{ backgroundColor: '#CD96D1', color: '#9F009F', marginTop: '20px', marginBottom: '30px' }}
          onClick={handleButtonClick}
        >
          View Questions
        </Button>
      </CardActions>
      {showQuestions && <Questions categoryLink={category.apiLink} categoryName={category.name} />}
    </Card>
  );
}

export default CategoryDetail;
