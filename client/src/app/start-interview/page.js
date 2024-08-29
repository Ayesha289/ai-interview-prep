'use client';
import 'regenerator-runtime/runtime';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Stack, IconButton, TextField } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, ExitToApp } from '@mui/icons-material';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRouter } from 'next/navigation';
import ExitConfirmationModal from './modal';

export default function StartInterview() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const router = useRouter(); // Use the useRouter hook to programmatically navigate

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the AI-based interviewer. Can you tell me a bit about yourself?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Initialize conversation history with the initial message from the assistant
  const [conversationHistory, setConversationHistory] = useState([
    { speaker: 'bot', message: "Hi! I'm the AI-based interviewer. Can you tell me a bit about yourself?" },
  ]);

  const messagesEndRef = useRef(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (isMicOn) {
      if (browserSupportsSpeechRecognition) {
        SpeechRecognition.startListening({ continuous: true });
      } else {
        console.error('SpeechRecognition API is not supported in this browser.');
      }
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isMicOn]);

    useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; 
    } else {
      if (messages.length && messages[messages.length - 1].role === 'assistant') {
        const lastMessage = messages[messages.length - 1].content;
        speakText(lastMessage);
      }
    }
  }, [messages]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech Synthesis not supported in this browser.');
    }
  };

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: text },
      { role: 'assistant', content: '' },
    ]);

    // Add user's message to conversation history
    setConversationHistory((history) => [
      ...history,
      { speaker: 'person', message: text },
    ]);

    resetTranscript(); // Clear the transcript when loading starts
    setText(''); // Clear the input text field immediately after sending

    try {
      const interviewId = localStorage.getItem('interviewId'); // Get interviewId from localStorage

      if (!interviewId) {
        console.error('Interview ID is missing in localStorage.');
        setIsLoading(false);
        return;
      }
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interviewId,
          messages: [...messages, { role: 'user', content: text }]
        })
      });

      const data = await response.json();

      setMessages((messages) => [
        ...messages.slice(0, messages.length - 1),
        { role: 'assistant', content: data.message },
      ]);

      // Add assistant's message to conversation history
      setConversationHistory((history) => [
        ...history,
        { speaker: 'bot', message: data.message },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleExitInterview = () => {
    setIsModalOpen(true); // Open the modal when "Exit Interview" is clicked
  };

  const handleConfirmExit = () => {
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory)); // Save to local storage
    setConversationHistory([]); // Clear the conversation history
    setIsModalOpen(false); // Close the modal
    router.push('/interview-result'); // Redirect to the interview results page
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without any action
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      overflow="hidden"
    >
      {isCameraOn && (
        <Webcam
          audio={false}
          width="100%"
          height="auto"
          sx={{ p: 2 }}
        />
      )}
      <Stack
        direction={'column'}
        width="400px"
        minWidth="400px"
        height="550px"
        border="1px solid black"
        p={2}
        spacing={3}
        sx={{ m: 2 }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your audio transcripts..."
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </Button>
        </Stack>
        <Stack direction={'row'} spacing={2} justifyContent="space-between">
          <IconButton onClick={toggleMic}>
            {isMicOn ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton onClick={toggleCamera}>
            {isCameraOn ? <Videocam /> : <VideocamOff />}
          </IconButton>
          <Button
            variant="contained"
            color="error"
            onClick={handleExitInterview} // Open the exit confirmation modal
          >
            Exit Interview <ExitToApp />
          </Button>
        </Stack>
      </Stack>

      <ExitConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmExit}
      />
    </Box>
  );
}
