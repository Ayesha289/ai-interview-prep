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
    
      setLoading(true); // Set loading state to true
    
      const userId = localStorage.getItem('userId'); // Retrieve user_id from localStorage
    
      const bodyContent = {
        role: jobRole,
        years_of_experience: parseInt(yearsOfExperience), // Ensure this is a number
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
          // Parse the response to JSON
          const data = await response.json();
    
          // Make sure data has interview_id before proceeding
          if (data && data.interview_id) {
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
        setLoading(false); // Reset loading state
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="job-role-modal-title" variant="h6" component="h2">
          Enter Your Job Role and Experience
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Job Role"
            variant="outlined"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Years of Experience"
            variant="outlined"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartInterview}
            fullWidth
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : "Let's Go 🚀"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
