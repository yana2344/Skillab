import React, { useState, useEffect, useRef } from "react";
import { sendMessage, listenForMessages } from "../../api/chat/chatService";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthProvider";
import { Box, Typography, IconButton, TextField, InputAdornment, Avatar, Paper, useTheme } from "@mui/material";
import { Send, Check, Search, Edit } from "@mui/icons-material";

function Chat() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { user } = useAuth();
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const messageEndRef = useRef(null);

    //   useEffect(() => {
    //     listenForMessages(user.uid, "vQu1kQE3zdSglLUNMQTdhToqPuR2", setMessages);
    //   }, [user.uid]);

    const handleSend = () => {
        if (input.trim()) {
            sendMessage(user.uid, "vQu1kQE3zdSglLUNMQTdhToqPuR2", input.trim());
            setInput("");
        }
    };

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        // In a real app, you would dispatch an action or use a context to update the messages
        // For this demo, we're just clearing the input
        setMessage("");
    };

    const chats = [
        {
            id: "1",
            name: "Alice",
            avatar: "/avatar1.png",
            lastMessage: "Hey!",
            timestamp: "2:45 PM",
            unread: 2,
            messages: [
                { id: "m1", text: "Hello", sent: true, time: "2:40 PM" },
                { id: "m2", text: "Hi!", sent: false, time: "2:41 PM" },
            ],
        },
    ];

    const currentChatData = chats.find((chat) => chat.id === currentChat);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentChatData?.messages]);

    return (
        <Box display="flex" height="90vh">
            {/* Sidebar */}
            <Box width={{ xs: "100%", md: 320 }} borderRight={1} display="flex" flexDirection="column">
                <Box
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={1}
                    borderColor="divider">
                    <Typography variant="h6">Messages</Typography>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Box>

                <Box p={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search messages"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box flex={1} overflow="auto">
                    {chats.map((chat) => (
                        <Box
                            key={chat.id}
                            p={2}
                            display="flex"
                            alignItems="center"
                            borderBottom={1}
                            borderColor="divider"
                            bgcolor={currentChat === chat.id ? colors.blue[400] : "transparent"}
                            onClick={() => setCurrentChat(chat.id)}
                            sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#333" } }}>
                            <Box position="relative">
                                <Avatar src={chat.avatar} />
                                {chat.unread > 0 && (
                                    <Box
                                        position="absolute"
                                        top={-5}
                                        right={-5}
                                        bgcolor="error.main"
                                        color="white"
                                        borderRadius="50%"
                                        width={20}
                                        height={20}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontSize="0.75rem">
                                        {chat.unread}
                                    </Box>
                                )}
                            </Box>
                            <Box ml={2} flex={1} overflow="hidden">
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography fontWeight="medium" noWrap>
                                        {chat.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {chat.timestamp}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {chat.lastMessage}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Main Chat Area */}
            <Box flex={1} display="flex" flexDirection="column">
                {currentChatData ? (
                    <>
                        <Box display="flex" alignItems="center" p={2} borderBottom={1} borderColor="divider">
                            <Avatar src={currentChatData.avatar} />
                            <Box ml={2}>
                                <Typography fontWeight="medium">{currentChatData.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Online
                                </Typography>
                            </Box>
                        </Box>

                        <Box flex={1} p={2} overflow="auto" bgcolor={colors.white[500]}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                {currentChatData.messages.map((msg) => (
                                    <Box key={msg.id} display="flex" justifyContent={msg.sent ? "flex-end" : "flex-start"}>
                                        <Paper
                                            elevation={msg.sent ? 0 : 1}
                                            sx={{
                                                p: 1.5,
                                                maxWidth: "75%",
                                                bgcolor: msg.sent ? colors.secondary[700] : colors.primary[600],
                                                color: "white",
                                                borderRadius: 2,
                                                borderTopRightRadius: msg.sent ? 0 : 2,
                                                borderTopLeftRadius: msg.sent ? 2 : 0,
                                            }}>
                                            <Typography variant="body2">{msg.text}</Typography>
                                            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={0.5}>
                                                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                                    {msg.time}
                                                </Typography>
                                                {msg.sent && <Check sx={{ fontSize: 14, ml: 0.5 }} />}
                                            </Box>
                                        </Paper>
                                    </Box>
                                ))}
                                <div ref={messageEndRef} />
                            </Box>
                        </Box>

                        <Box p={2} borderTop={1} borderColor="divider">
                            <Box display="flex" alignItems="center" borderRadius={2} px={1}>
                                <TextField
                                    color={colors.white[100]}
                                    multiline
                                    fullWidth
                                    maxRows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    variant="standard"
                                    InputProps={{ disableUnderline: true, sx: { py: 1.5 } }}
                                    sx={{ px: 1, color: colors.white[100] }}
                                />

                                <IconButton
                                    disabled={!message.trim()}
                                    onClick={sendMessage}
                                    sx={{
                                        bgcolor: message.trim() ? "primary.main" : "grey.300",
                                        color: "white",
                                        ml: 1,
                                        "&:disabled": { bgcolor: "grey.300", color: "grey.500" },
                                    }}>
                                    <Send />
                                </IconButton>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box flex={1} display="flex" justifyContent="center" alignItems="center" bgcolor={colors.primary[500]}>
                        <Box textAlign="center">
                            <Typography variant="h3" color="grey.300">
                                <i className="far fa-comments"></i>
                            </Typography>
                            <Typography variant="h6" color={colors.white[500]} mt={2}>
                                No conversation selected
                            </Typography>
                            <Typography variant="body2" color={colors.white[500]}>
                                Choose a contact from the list to start chatting
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

export default Chat;