import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function ExitConfirmationModal({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#1e1e1e',  
          color: 'white',  
        },
      }}
    >
      <DialogTitle sx={{ color: 'white' }}>Exit Interview</DialogTitle> 
      <DialogContent>
        <DialogContentText sx={{ color: 'white' }}>
          Are you sure you want to exit the interview?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#00bcd4',  
            '&:hover': {
              backgroundColor: '#0097a7',  
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            color: '#00bcd4',  
            '&:hover': {
              backgroundColor: '#0097a7',  
            },
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExitConfirmationModal;
