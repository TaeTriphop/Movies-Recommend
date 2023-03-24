import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HdIcon from '@mui/icons-material/Hd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';



const cards = [1];
// const options_category = [];

const theme = createTheme();

export default function Movies() {
  // Fetch data
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    // Fetch the JSON data from API endpoint
    fetch('http://localhost:9000/Catagory')
      .then(response => response.json())
      .then(data => {
        const convertedData = data.data.map(item => ({
          label: item.category_name_en,
          value: item.category_id
        }));
        setCategories(convertedData);

      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // Fetch the JSON data from API endpoint
    fetch('http://localhost:9000/movies')
      .then(response => response.json())
      .then(data => {
        const convertedData = data.data.map(item => ({
          label: item.movies_name_en + ` (${item.movies_year})`,
          value: item.movies_id
        }));
        setMovies(convertedData);

      })
      .catch(error => console.log(error));
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <HdIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Movies Recommended
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movies Recommended By Tae
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.

            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="category_movies"
                options={categories}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"              
                options={movies}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      p: '2%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
}