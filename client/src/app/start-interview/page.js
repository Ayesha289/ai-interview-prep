'use client';
import 'regenerator-runtime/runtime';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Stack, IconButton, TextField, Paper } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, ExitToApp } from '@mui/icons-material';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRouter } from 'next/navigation';
import ExitConfirmationModal from './modal';
import Navbar from './navbar';
import Footer from '../components/landingPage/footer';

export default function StartInterview() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const router = useRouter();

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([{ speaker: 'bot', message: "Hi! I'm the AI-based interviewer. Can you tell me a bit about yourself?" }]);

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
  }, [browserSupportsSpeechRecognition, isMicOn]);

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

    setConversationHistory((history) => [
      ...history,
      { speaker: 'person', message: text },
    ]);

    resetTranscript();
    setText('');

    try {
      const systemPrompt = localStorage.getItem('prompt');
      if (!systemPrompt) {
        console.error('Prompt is missing in localStorage.');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: [...messages, { role: 'user', content: text }],
        }),
      });

      const data = await response.json();
      setMessages((messages) => [
        ...messages.slice(0, messages.length - 1),
        { role: 'assistant', content: data.message },
      ]);

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
    setIsModalOpen(true);
  };

  const handleConfirmExit = () => {
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    setConversationHistory([]);
    setIsModalOpen(false);
    router.push('/interview-result');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: '#121212' }}>
      <Navbar />
  
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        {/* Main Container with Flex Direction set to row */}
        <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#1c1c1c', borderRadius: 2, boxShadow: 3, overflow: 'hidden', width: '100%', maxWidth: '1400px', height: '500px' }}>
          
          {/* Camera Container */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRight: '1px solid #424242', bgcolor: isCameraOn ? 'black' : 'transparent' }}>
            {isCameraOn ? (
              <Webcam audio={false} width="100%" height="auto" />
            ) : (
              <Box sx={{ width: '100%', height: '100%' }} />
            )}
          </Box>
          
          {/* Chat Container */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
            <Paper elevation={3} sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#2e2e2e' }}>
              {messages.map((message, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end', mb: 2 }}>
                  <Box sx={{ bgcolor: message.role === 'assistant' ? '#b2dfdb' : '#00695c', color: 'white', borderRadius: 2, p: 2 }}>
                    {message.content}
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Paper>
  
            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your response here..."
                sx={{ bgcolor: '#2e2e2e', input: { color: 'white' } }}
              />
              <Button variant="contained" onClick={sendMessage} disabled={isLoading} sx={{ bgcolor: '#00695c' }}>
                Send
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <IconButton onClick={toggleMic} sx={{ color: isMicOn ? '#b2dfdb' : '#f44336' }}>
                {isMicOn ? <Mic /> : <MicOff />}
              </IconButton>
              <IconButton onClick={toggleCamera} sx={{ color: isCameraOn ? '#b2dfdb' : '#f44336' }}>
                {isCameraOn ? <Videocam /> : <VideocamOff />}
              </IconButton>
              <Button variant="contained" color="error" onClick={handleExitInterview} sx={{ bgcolor: '#f44336' }}>
                Exit Interview <ExitToApp />
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
  
      <Footer />
  
      <ExitConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmExit}
      />
    </Box>
  );  
}
