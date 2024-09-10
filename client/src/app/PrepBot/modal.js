'use client';
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from "next/navigation";
import CustomAlert from '../components/CustomAlert';

export default function JobRoleModal() {
  const [open, setOpen] = useState(true);
  const [jobRole, setJobRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartInterview = async () => {
    if (jobRole.trim() === '' || yearsOfExperience.trim() === '') {
      showAlert('Please fill out all fields.');
      return;
    }

    setLoading(true); 

    const userId = localStorage.getItem('userId');

    const bodyContent = {
      role: jobRole,
      years_of_experience: parseInt(yearsOfExperience), 
      user_id: userId,
    };

    try {
      const response = await fetch('https://ai-interview-sage.vercel.app/api/initialize', {
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
          showAlert('Error: Interview ID not received from server.');
        }
      } else {
        showAlert('Failed to initialize interview. Please try again.');
      }
    } catch (error) {
      console.error('Error initializing interview:', error);
      showAlert('Error initializing interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };


  return (
    <>
    <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={closeAlert}
    />
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
    </>
  );
}
