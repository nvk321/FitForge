import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, CircularProgress, Grid } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StraightenIcon from '@mui/icons-material/Straighten';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [dailyGoal] = useState(10000);

  useEffect(() => {
    let interval;
    if (isCounting) {
      interval = setInterval(() => {
        // Simulate steps (random number between 1-5 every 2 seconds)
        const newSteps = Math.floor(Math.random() * 5) + 1;
        setSteps(prev => prev + newSteps);
        
        // Calculate distance (assuming average step length of 0.7 meters)
        setDistance(prev => prev + (newSteps * 0.7));
        
        // Calculate calories (assuming 0.04 calories per step)
        setCalories(prev => prev + (newSteps * 0.04));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isCounting]);

  const resetCounter = () => {
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setIsCounting(false);
  };

  const progress = (steps / dailyGoal) * 100;

  const StatCard = ({ icon, value, unit, label, color }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {React.cloneElement(icon, { sx: { color, fontSize: 24, mr: 1 } })}
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>
        {value}
        <Typography component="span" variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
          {unit}
        </Typography>
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" className="component-title">
        Step Counter
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={160}
            thickness={8}
            sx={{
              color: '#2196f3',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          />
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={8}
            sx={{
              color: 'rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              left: 0,
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DirectionsWalkIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
              {steps}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              of {dailyGoal} steps
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {Math.round(progress)}% of daily goal
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StatCard
              icon={<StraightenIcon />}
              value={(distance / 1000).toFixed(2)}
              unit="km"
              label="Distance"
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={6}>
            <StatCard
              icon={<LocalFireDepartmentIcon />}
              value={calories.toFixed(1)}
              unit="kcal"
              label="Calories"
              color="#f44336"
            />
          </Grid>
        </Grid>
      </Box>

      <Box className="button-group">
        <Button
          variant="contained"
          color={isCounting ? "error" : "primary"}
          onClick={() => setIsCounting(!isCounting)}
          sx={{
            minWidth: 150,
            boxShadow: isCounting ? '0 4px 12px rgba(244, 67, 54, 0.2)' : '0 4px 12px rgba(33, 150, 243, 0.2)',
          }}
        >
          {isCounting ? "Stop Counting" : "Start Counting"}
        </Button>
        <Button
          variant="outlined"
          onClick={resetCounter}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default StepCounter; 