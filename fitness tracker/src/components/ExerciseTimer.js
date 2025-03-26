import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Paper, Divider, Chip } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ExerciseTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseHistory, setExerciseHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!exerciseName) {
      alert('Please enter an exercise name');
      return;
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setExerciseName('');
  };

  const saveExercise = () => {
    if (time > 0) {
      setExerciseHistory(prev => [{
        name: exerciseName,
        duration: time,
        date: new Date().toLocaleString()
      }, ...prev]);
      resetTimer();
    }
  };

  const getTimeColor = () => {
    if (time < 300) return '#2196f3'; // < 5 minutes
    if (time < 900) return '#4caf50'; // < 15 minutes
    if (time < 1800) return '#ff9800'; // < 30 minutes
    return '#f44336'; // >= 30 minutes
  };

  return (
    <Box>
      <Typography variant="h5" className="component-title">
        Exercise Timer
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          fullWidth
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3
        }}>
          <Box sx={{ 
            position: 'relative',
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}>
            <TimerIcon sx={{ 
              fontSize: 120,
              color: getTimeColor(),
              opacity: 0.1,
              position: 'absolute'
            }} />
            <Typography variant="h2" sx={{
              fontWeight: 'bold',
              color: getTimeColor(),
              fontFamily: 'monospace',
              transition: 'color 0.3s ease-in-out'
            }}>
              {formatTime(time)}
            </Typography>
          </Box>

          <Box className="button-group" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color={isRunning ? "error" : "primary"}
              onClick={isRunning ? pauseTimer : startTimer}
              startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
              sx={{
                minWidth: 120,
                boxShadow: isRunning ? '0 4px 12px rgba(244, 67, 54, 0.2)' : '0 4px 12px rgba(33, 150, 243, 0.2)',
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outlined"
              onClick={resetTimer}
              startIcon={<RestartAltIcon />}
              sx={{ minWidth: 120 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={saveExercise}
              disabled={time === 0}
              startIcon={<SaveIcon />}
              sx={{
                minWidth: 120,
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
              }}
            >
              Save
            </Button>
          </Box>
        </Box>

        {exerciseHistory.length > 0 && (
          <Box>
            <Divider sx={{ mb: 2 }}>
              <Chip 
                icon={<FitnessCenterIcon />} 
                label="Exercise History" 
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiChip-icon': { color: 'primary.main' }
                }} 
              />
            </Divider>
            <Box sx={{ 
              maxHeight: '250px',
              overflow: 'auto',
              pr: 1
            }}>
              {exerciseHistory.map((exercise, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {exercise.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {formatTime(exercise.duration)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {exercise.date}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExerciseTimer; 