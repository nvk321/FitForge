import React from 'react';
import { Container, Grid, Paper, Typography, Box, AppBar, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // Import Navbar
import SpO2Monitor from './components/SpO2Monitor';
import StepCounter from './components/StepCounter';
import CalorieMeter from './components/CalorieMeter';
import ExerciseTimer from './components/ExerciseTimer';
import './App.css';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FFF 30%, #E3F2FD 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              FitForge
            </Typography>
          </Toolbar>
        </AppBar>

        <Navbar />
        <Routes>
          {/* Define your routes */}
          <Route path="/index.html" element={<h1>Home Page</h1>} />
          <Route path="/workouts.html" element={<h1>Workouts Page</h1>} />
          <Route path="/fitnessTracker.html" element={<h1>Tracking Page</h1>} />
          <Route path="/diet.html" element={<h1>Diet Page</h1>} />
          <Route path="/login.html" element={<h1>Login Page</h1>} />
        </Routes>
      </Router>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* SpO2 Monitor */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              p: 3,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <SpO2Monitor />
            </Paper>
          </Grid>

          {/* Step Counter */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              p: 3,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <StepCounter />
            </Paper>
          </Grid>

          {/* Calorie Meter */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              p: 3,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <CalorieMeter />
            </Paper>
          </Grid>

          {/* Exercise Timer */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              p: 3,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <ExerciseTimer />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
