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
      content: "Hi! I'm Preppy, an AI-based interviewer. Can you tell me a bit about yourself?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([{ speaker: 'assistant', message: "Hi! I'm Preppy an AI-based interviewer. Can you tell me a bit about yourself?" }]);

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
      // Speak the initial message after the component mounts
      if (messages.length) {
        const initialMessage = messages[0].content; 
        speakText(initialMessage);
      }
    } else {
      if (messages.length && messages[messages.length - 1].role === 'assistant') {
        const lastMessage = messages[messages.length - 1].content;
        speakText(lastMessage);
      }
    }
  }, [messages]);

  const speakText = async (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const setVoice = async () => {
        const voices = window.speechSynthesis.getVoices();
        const desiredVoice = voices.find(voice => voice.name === 'Microsoft Mark - English (United States)');
        if (desiredVoice) {
          utterance.voice = desiredVoice;
        }
        window.speechSynthesis.speak(utterance);
      };
      
      // Fetch voices and then speak
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoice();
        };
      } else {
        setVoice();
      }
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: '#121212' }}>
      <Navbar />
  
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#1c1c1c', borderRadius: 2, boxShadow: 3, overflow: 'hidden', width: '100%', maxWidth: '1400px', height: '500px' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRight: '1px solid #424242', bgcolor: isCameraOn ? 'black' : 'transparent' }}>
            {isCameraOn ? (
              <Webcam audio={false} width="100%" height="auto" />
            ) : (
              <Box sx={{ width: '100%', height: '100%' }} />
            )}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
            {/* Image container above the send button */}
            <Box sx={{ width: '100%', height: '200px', mb: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{
                width: '250px', 
                height: '250px',
                borderRadius: '50%',
                border: '5px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="assets/interviewMascot.png" alt="Interview" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
              </Box>
            </Box>

            <Stack direction="row" spacing={2} mt={2}>
            <TextField
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your response..."
                multiline
                minRows={1}
                maxRows={6}
                sx={{ bgcolor: '#2e2e2e', input: { color: 'white' }, '& textarea': { color: 'white' } }}
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
