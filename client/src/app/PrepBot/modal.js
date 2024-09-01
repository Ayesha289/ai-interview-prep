'use client';
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from "next/navigation";

export default function JobRoleModal() {
  const [open, setOpen] = useState(true);
  const [jobRole, setJobRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartInterview = async () => {
    if (jobRole.trim() === '' || yearsOfExperience.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true); 

    const userId = localStorage.getItem('userId');
    let currentCredits = parseInt(localStorage.getItem('credits'))
    if (isNaN(currentCredits)) {
      console.error('Invalid credits in localStorage');
      return;
    }
    let newCredits = currentCredits - 25;
    localStorage.setItem('credits', newCredits);

    const bodyContent = {
      role: jobRole,
      years_of_experience: parseInt(yearsOfExperience), 
      user_id: userId,
      credits: parseInt(localStorage.getItem('credits'))
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          localStorage.setItem('interviewId', data.interview_id);
          localStorage.setItem('prompt', data.prompt);
          router.push('/start-interview');
        } else {
          alert('Error: Interview ID not received from server.');
        }
      } else {
        alert('Failed to initialize interview. Please try again.');
      }
    } catch (error) {
      console.error('Error initializing interview:', error);
      alert('Error initializing interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="job-role-modal-title"
      aria-describedby="job-role-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1e1e1e',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="job-role-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'white' }}  
        >
          Enter Your Job Role and Experience
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Job Role"
            variant="outlined"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            sx={{
              mb: 2,
              input: { color: 'white' },  
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#00bcd4',  
                },
                '&:hover fieldset': {
                  borderColor: '#00bcd4', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00bcd4', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#00bcd4',  
              },
            }}
          />
          <TextField
            fullWidth
            label="Years of Experience"
            variant="outlined"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            type="number"
            sx={{
              mb: 2,
              input: { color: 'white' }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#00bcd4',  
                },
                '&:hover fieldset': {
                  borderColor: '#00bcd4', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00bcd4',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#00bcd4',  
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleStartInterview}
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: '#00bcd4',
              color: 'white',
              '&:hover': {
                bgcolor: '#0097a7',
              },
            }}
          >
            {loading ? 'Loading...' : "Let's Go 🚀"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
