'use client';
// import styles from "./page.module.css";
// import { Inventory, QrCodeScanner, Summarize } from "@mui/icons-material";
import {
  Button,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface Message {
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi! i'm the Headstarter assistant. How can I help you today?`,
  }]);
  const sendMessage = async () => {
    const newMessage = {role: 'user', content: message};
    setMessages((messages) => [...messages, newMessage]);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, newMessage]),
    });
    const data = await response.json();
    setMessages((messages) => [...messages, {role: 'assistant', content: data.message}]);
    setMessage('');
  };
  const [message, setMessage] = useState('');
  return (
    <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        p={3}
        border="1px solid black"
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {
            messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={2}
              >
                {message.content}
              </Box>
            </Box>
          ))
          }
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
