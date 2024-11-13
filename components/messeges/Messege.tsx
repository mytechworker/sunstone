"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import './messege.css'
import { AiOutlinePlus } from "react-icons/ai";

interface Channel {
    name: string;
    initials: string;
    color: string;
    messageCount: number;
}

interface Message {
    sender: string;
    text: string;
    time: string;
    type: "incoming" | "outgoing";
    avatar: string;
    unreadCount?: number;
}

const channels: Channel[] = [
    { name: "Product Design", initials: "PD", color: "bg-[#cee3f7] text-[#459cec]", messageCount: 24 },
    { name: "Development", initials: "D", color: "bg-[#e5f3dd] text-[#5d923d]", messageCount: 6 },
    { name: "Marketing", initials: "M", color: "bg-[#ece8ff] text-[#7662e9]", messageCount: 11 },
];

const directMessages: Message[] = [
    { sender: "David Subegja", text: "Hey, did you get a chance to review the usability test report?", time: "8 min ago", type: "incoming", avatar: "/images/person.png", unreadCount: 4 },
    { sender: "Amanda Manopo", text: "Let me know if you need help with the prototype testing.", time: "Yesterday", type: "incoming", avatar: "/images/person2.png" },
    { sender: "Alyssia Volkov", text: "Are you available for a quick sync-up on the new design?", time: "Oct 8, 2022", type: "incoming", avatar: "/images/person3.png" },
];

const initialMessages: Message[] = [
    { sender: directMessages[0].sender.split(" ")[0], text: "Hi guys!!!", time: "2 min ago", type: "incoming", avatar: "/images/person.png" },
    { sender: directMessages[1].sender.split(" ")[0], text: "On this group you can ask and chat about design, or even off-topic discussions 👅", time: "2 min ago", type: "incoming", avatar: "/images/person2.png" },
    { sender: "Reina", text: "Hi everyone! Excited to be here!", time: "11:34 AM", type: "incoming", avatar: "/images/reina.png" },
    { sender: "You", text: "Hi all, glad to be part of this group!", time: "8 min ago", type: "outgoing", avatar: "" },
];

const Message: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(channels[0]);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(true);
    const [isdirectExpanded, setIsDirectExpanded] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleChannelSelect = (channel: Channel) => {
        setSelectedChannel(channel);
        setMessages(initialMessages);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                sender: "You",
                text: newMessage,
                time: "Just now",
                type: "outgoing",
                avatar: "",
            };
            setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDirectExpand = () => {
        setIsDirectExpanded(!isdirectExpanded);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            console.log("Selected file:", selectedFile);  // Handle the file selection here
        }
    };
    const handlefileselect = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="w-full h-screen bg-[#eceef3] flex flex-col items-center p-4 md:p-6 mt-20">
            <div className="w-full flex justify-start mb-4">
                <h1 className="text-[#1c1f24] text-2xl font-semibold tracking-tight font-[Poppins]">Messages</h1>
            </div>
            <div className="w-full h-[662px] flex flex-col md:flex-row gap-10">
                <div className="w-[360px] md:w-1/4 bg-white rounded-[20px] shadow-md p-4 hide-scrollbar">
                    {/* Search Box */}
                    <div className="flex w-full items-center gap-3 mb-5">
                        <div className="flex items-center justify-between w-full h-[34px] rounded-[10px] border border-[#e0e2e7] pl-5 bg-white">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.75 15.75L12.4875 12.4875" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full bg-transparent outline-none text-[#a2a5ab] text-[13px] font-normal tracking-tight font-[Poppins] px-2"
                            />
                        </div>
                        <button className="flex items-center justify-center h-[34px] rounded-[10px] border border-[#e0e2e7] px-3 bg-white">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2076_1248)">
                                    <path d="M4.5 9H13.5" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.6875 5.625H16.3125" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.3125 12.375H10.6875" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2076_1248">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>

                    {/* Channels List */}
                    <div className="flex flex-col space-y-4  max-h-[300px]">
                        <div className="flex items-center justify-between space-x-4 px-4">
                            <div className="flex items-center space-x-4">
                                <div className="text-[#1c1f24] text-sm font-medium tracking-tight font-[Poppins]">CHANNELS</div>
                                <button className="bg-[#ece8ff] text-[#7662e9] rounded-md w-5 h-5 flex items-center justify-center">
                                    <AiOutlinePlus className="w-4 h-4" />
                                </button>
                            </div>
                            <button onClick={handleToggleExpand} className="h-[18px] w-[18px] flex items-center justify-center rounded hover:bg-[#f6f7fa] transition">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d={isExpanded ? "M13.5 11.25L9 6.75L4.5 11.25" : "M4.5 6.75L9 11.25L13.5 6.75"} stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {isExpanded && channels.map((channel, index) => (
                            <div
                                key={index}
                                onClick={() => handleChannelSelect(channel)}
                                className={`p-4 flex items-center space-x-4  rounded-[10px] cursor-pointer ${selectedChannel?.name === channel.name ? "bg-[#f6f7fa]" : "hover:bg-[#f6f7fa]"}`}
                            >
                                <div className={`rounded-full w-10 h-10 flex items-center justify-center font-[Poppins] text-lg font-semibold ${channel.color}`}>
                                    {channel.initials}
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="text-[#1c1f24] text-sm font-semibold tracking-tight font-[Poppins]">
                                        {channel.name}
                                    </div>
                                    <div className="text-xs text-white px-3 py-1 rounded-lg font-semibold font-[Poppins] bg-[#7662ea]">
                                        {channel.messageCount}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Direct Messages List */}
                    <div className="mt-6 flex flex-col space-y-4 hide-scrollbar">
                        <div className="flex items-center justify-between px-4 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="text-[#1c1f24] text-sm font-medium tracking-tight font-[Poppins]">DIRECT MESSAGES</div>
                                <button className="bg-[#ece8ff] text-[#7662e9] rounded-md w-5 h-5 flex items-center justify-center">
                                    <AiOutlinePlus className="w-4 h-4" />
                                </button>
                            </div>
                            <button onClick={handleDirectExpand} className="h-[18px] w-[18px] flex items-center justify-center rounded hover:bg-[#f6f7fa] transition">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d={isdirectExpanded ? "M13.5 11.25L9 6.75L4.5 11.25" : "M4.5 6.75L9 11.25L13.5 6.75"} stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-scroll hide-scrollbar w-full">
                            {isdirectExpanded && directMessages.map((user, index) => (
                                <div key={index} className="flex items-center p-4 rounded-[10px] hover:bg-[#f6f7fa] cursor-pointer space-x-4">
                                    <div className="rounded-full w-12 h-12 flex items-center justify-center">
                                        <Image src={user.avatar} alt={`${user.sender}'s avatar`} width={48} height={48} className="rounded-full" />
                                    </div>
                                    <div className="flex-1 w-6">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-[#1c1f24] text-sm font-semibold font-[Poppins]">{user.sender}</div>
                                            <div className="text-[#6b6e74] text-xs">{user.time}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-[#393d44] text-xs truncate">{user.text}</div>
                                            {user.unreadCount && (
                                                <div className="text-xs text-white px-4 py-1 rounded-full font-semibold font-[Poppins] bg-[#7662ea]">
                                                    {user.unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Message Panel */}
                <div className="w-full h-[662px] md:w-3/4 bg-white rounded-[20px] shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between w-full h-[80px] p-4 bg-white sticky top-0 border-b border-[#e0e2e7] z-10">
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full ${selectedChannel?.color} flex items-center justify-center font-bold text-lg`}>
                                {selectedChannel?.initials}
                            </div>
                            <div>
                                <h2 className="text-[#1c1f24] text-lg font-semibold font-[Poppins]">{selectedChannel?.name}</h2>
                                <div className="flex gap-3 items-center mt-1">
                                    <div>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_2076_1146)">
                                                <path d="M14.3438 9.5625H17.1562" stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.75 8.15625V10.9688" stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.59375 11.25C9.9237 11.25 11.8125 9.3612 11.8125 7.03125C11.8125 4.7013 9.9237 2.8125 7.59375 2.8125C5.2638 2.8125 3.375 4.7013 3.375 7.03125C3.375 9.3612 5.2638 11.25 7.59375 11.25Z" stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M1.56094 14.0625C2.3001 13.1815 3.22324 12.4731 4.26548 11.9871C5.30772 11.5011 6.44376 11.2492 7.59375 11.2492C8.74374 11.2492 9.87978 11.5011 10.922 11.9871C11.9643 12.4731 12.8874 13.1815 13.6266 14.0625" stroke="#7662EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2076_1146">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <p className="text-sm text-[#5952c4] font-[Poppins]">Add people</p>
                                </div>
                            </div>
                        </div>
                        <button className="text-[#7662e9] font-medium hover:text-[#5952c4] px-3 py-2 border border-[#e0e2e7] rounded-lg ">
                            ...
                        </button>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto flex-1 hide-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === "outgoing" ? "flex-col items-end" : "items-start"} space-y-1`}>
                                {msg.type === "incoming" && (
                                    <Image src={msg.avatar} alt={`${msg.sender} profile`} width={44} height={44} className="rounded-full" />
                                )}
                                <div className="flex flex-col space-y-1 p-2">
                                    <div className="text-[#1c1f24] text-xs font-medium tracking-tight font-[Poppins]">{msg.sender}</div>
                                    <div className={`p-2 rounded-lg shadow-md max-w-[340px] font-[Poppins] text-sm ${msg.type === "outgoing" ? "bg-[#7662e9] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg" : "bg-white text-[#393d44] border border-[#e0e2e7]"}`}>
                                        {msg.text}
                                    </div>
                                    <div className="text-[#a2a5ab] text-xs font-normal tracking-tight font-[Poppins]">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Box */}
                    <div className="w-full p-4 border-t border-[#e0e2e7]">
                        <div className="w-full h-12 flex items-center bg-[#f6f7fa] rounded-xl border border-[#e0e2e7] px-4">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2076_1098)">
                                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.1875 9.6875C7.87786 9.6875 8.4375 9.12786 8.4375 8.4375C8.4375 7.74714 7.87786 7.1875 7.1875 7.1875C6.49714 7.1875 5.9375 7.74714 5.9375 8.4375C5.9375 9.12786 6.49714 9.6875 7.1875 9.6875Z" fill="#6B6E75" />
                                    <path d="M12.8125 9.6875C13.5029 9.6875 14.0625 9.12786 14.0625 8.4375C14.0625 7.74714 13.5029 7.1875 12.8125 7.1875C12.1221 7.1875 11.5625 7.74714 11.5625 8.4375C11.5625 9.12786 12.1221 9.6875 12.8125 9.6875Z" fill="#6B6E75" />
                                    <path d="M13.2497 11.875C12.9193 12.4442 12.4452 12.9167 11.8748 13.2451C11.3044 13.5735 10.6578 13.7464 9.99967 13.7464C9.34152 13.7464 8.6949 13.5735 8.12454 13.2451C7.55418 12.9167 7.08007 12.4442 6.74967 11.875" stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2076_1098">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <input
                                type="text"
                                placeholder="Write your messages..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full pl-4 bg-transparent outline-none text-[#a2a5ab] text-[13px] font-normal tracking-tight font-[Poppins]"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <button onClick={handlefileselect} className="flex items-center cursor-pointer">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2076_1094)">
                                            <path
                                                d="M7.50034 13.7501L14.9847 6.54699C15.395 6.13673 15.6255 5.5803 15.6255 5.00011C15.6255 4.41992 15.395 3.86349 14.9847 3.45324C14.5745 3.04298 14.018 2.8125 13.4378 2.8125C12.8576 2.8125 12.3012 3.04298 11.891 3.45324L4.2269 11.1017C3.52449 11.8041 3.12988 12.7568 3.12988 13.7501C3.12988 14.7435 3.52449 15.6961 4.2269 16.3985C4.92931 17.101 5.88198 17.4956 6.87534 17.4956C7.8687 17.4956 8.82137 17.101 9.52378 16.3985L15.9378 10.0001"
                                                stroke="#6B6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2076_1094">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                className="text-[#7662e9] pl-5 font-[Poppins] font-medium ml-2 hover:text-[#5952c4]"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
