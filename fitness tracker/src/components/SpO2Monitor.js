import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpO2Monitor = () => {
  const [spO2, setSpO2] = useState(98);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [spO2Data, setSpO2Data] = useState([]);
  const [status, setStatus] = useState('Normal');

  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(() => {
        const newSpO2 = Math.floor(Math.random() * 6) + 95;
        setSpO2(newSpO2);
        
        const now = new Date();
        setTimeData(prev => [...prev, now.toLocaleTimeString()].slice(-10));
        setSpO2Data(prev => [...prev, newSpO2].slice(-10));

        // Update status based on SpO2 level
        if (newSpO2 >= 95) {
          setStatus('Normal');
        } else if (newSpO2 >= 90) {
          setStatus('Moderate');
        } else {
          setStatus('Low');
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = () => {
    switch (status) {
      case 'Normal':
        return '#4caf50';
      case 'Moderate':
        return '#ff9800';
      case 'Low':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const chartData = {
    labels: timeData,
    datasets: [
      {
        label: 'SpO2 Level',
        data: spO2Data,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2196f3',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2196f3',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 12,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        min: 90,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <Box>
      <Typography variant="h5" className="component-title">
        SpO2 Monitor
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 3 
      }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={spO2}
            size={120}
            thickness={8}
            sx={{
              color: getStatusColor(),
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                transition: 'all 0.3s ease-in-out',
              },
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: getStatusColor() }}>
              {spO2}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              SpO2 %
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          mb: 2,
          color: getStatusColor(),
          fontWeight: 600,
          transition: 'color 0.3s ease-in-out',
        }}
      >
        Status: {status}
      </Typography>

      <Box sx={{ height: '200px', mb: 3 }}>
        <Line data={chartData} options={chartOptions} />
      </Box>

      <Box className="button-group">
        <Button
          variant="contained"
          color={isMonitoring ? "error" : "primary"}
          onClick={() => setIsMonitoring(!isMonitoring)}
          sx={{
            minWidth: 150,
            boxShadow: isMonitoring ? '0 4px 12px rgba(244, 67, 54, 0.2)' : '0 4px 12px rgba(33, 150, 243, 0.2)',
          }}
        >
          {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
        </Button>
      </Box>
    </Box>
  );
};

export default SpO2Monitor; 