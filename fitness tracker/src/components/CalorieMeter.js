import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, LinearProgress, TextField, Grid, Paper } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TimerIcon from '@mui/icons-material/Timer';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const CalorieMeter = () => {
  const [calories, setCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [isTracking, setIsTracking] = useState(false);
  const [activity, setActivity] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);

  const activities = {
    'Walking': { calories: 280, color: '#4caf50' },
    'Running': { calories: 600, color: '#f44336' },
    'Cycling': { calories: 450, color: '#2196f3' },
    'Swimming': { calories: 500, color: '#00bcd4' },
    'Weight Training': { calories: 400, color: '#9c27b0' },
    'Yoga': { calories: 200, color: '#ff9800' },
    'Dancing': { calories: 400, color: '#e91e63' },
    'Basketball': { calories: 600, color: '#ff5722' },
    'Tennis': { calories: 450, color: '#8bc34a' },
    'Soccer': { calories: 500, color: '#03a9f4' }
  };

  useEffect(() => {
    let interval;
    if (isTracking && activity) {
      interval = setInterval(() => {
        const caloriesPerHour = activities[activity].calories;
        const caloriesPerMinute = caloriesPerHour / 60;
        setCalories(prev => prev + caloriesPerMinute);
        setTimeSpent(prev => prev + 1);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isTracking, activity]);

  const resetCalories = () => {
    setCalories(0);
    setTimeSpent(0);
    setIsTracking(false);
    setActivity('');
  };

  const progress = (calories / dailyGoal) * 100;
  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <Box>
      <Typography variant="h5" className="component-title">
        Calorie Meter
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocalFireDepartmentIcon sx={{ color: 'orange', mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Calories Burned Today
            </Typography>
          </Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}>
            {Math.round(calories)}
            <Typography component="span" variant="h6" sx={{ ml: 1, color: 'text.secondary' }}>
              / {dailyGoal} kcal
            </Typography>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(progress, 100)}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'rgba(255, 107, 107, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                borderRadius: 5,
              },
            }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Paper elevation={0} sx={{ 
              p: 2, 
              bgcolor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TimerIcon sx={{ color: '#2196f3' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Time Active
                </Typography>
                <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  {formatTime(timeSpent)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} sx={{ 
              p: 2, 
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <WhatshotIcon sx={{ color: '#f44336' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Burn Rate
                </Typography>
                <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                  {activity ? `${activities[activity].calories}/h` : '0/h'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <TextField
          select
          label="Select Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          fullWidth
          SelectProps={{
            native: true,
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          <option value="">Select an activity</option>
          {Object.entries(activities).map(([name, data]) => (
            <option key={name} value={name}>
              {name} ({data.calories} kcal/hour)
            </option>
          ))}
        </TextField>

        <Box className="button-group">
          <Button
            variant="contained"
            color={isTracking ? "error" : "primary"}
            onClick={() => setIsTracking(!isTracking)}
            disabled={!activity}
            sx={{
              minWidth: 150,
              boxShadow: isTracking ? '0 4px 12px rgba(244, 67, 54, 0.2)' : '0 4px 12px rgba(33, 150, 243, 0.2)',
            }}
          >
            {isTracking ? "Stop Tracking" : "Start Tracking"}
          </Button>
          <Button
            variant="outlined"
            onClick={resetCalories}
            sx={{ minWidth: 120 }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CalorieMeter; 