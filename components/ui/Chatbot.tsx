"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaComments, 
  FaPhone, 
  FaPhoneSlash, 
  FaMicrophone, 
  FaMicrophoneSlash,
  FaXmark,
  FaArrowUp
} from "react-icons/fa6";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type CallStatus = "idle" | "calling" | "ringing" | "connected" | "ended";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate incoming call after 10 seconds of being open
  useEffect(() => {
    if (isOpen && callStatus === "idle") {
      const timer = setTimeout(() => {
        setIsIncomingCall(true);
        setCallStatus("ringing");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, callStatus]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! I'm here to help. Would you like to schedule a call?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const initializePeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real app, send this to the other peer via signaling server
        console.log("ICE candidate:", event.candidate);
      }
    };

    pc.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  const startLocalAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      if (peerConnectionRef.current) {
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, stream);
        });
      }

      return stream;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to make calls");
      return null;
    }
  };

  const makeCall = async () => {
    if (callStatus !== "idle" && callStatus !== "ringing") return;

    setCallStatus("calling");
    const stream = await startLocalAudio();
    
    if (!stream) {
      setCallStatus("idle");
      return;
    }

    peerConnectionRef.current = initializePeerConnection();
    
    // Create offer
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    // Simulate call connection
    setTimeout(() => {
      setCallStatus("connected");
      setIsIncomingCall(false);
      addBotMessage("Call connected! You can now speak.");
    }, 2000);
  };

  const answerCall = async () => {
    if (callStatus !== "ringing") return;
    
    setIsIncomingCall(false);
    await makeCall();
  };

  const endCall = () => {
    setCallStatus("ended");
    
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Clear audio refs
    if (localAudioRef.current) {
      localAudioRef.current.srcObject = null;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }

    // Reset after a moment
    setTimeout(() => {
      setCallStatus("idle");
      setIsMuted(false);
      addBotMessage("Call ended. How else can I help you?");
    }, 500);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const rejectCall = () => {
    setIsIncomingCall(false);
    setCallStatus("idle");
    addBotMessage("Call rejected. Is there anything else I can help with?");
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const getCallStatusText = () => {
    switch (callStatus) {
      case "calling":
        return "Calling...";
      case "ringing":
        return isIncomingCall ? "Incoming call..." : "Ringing...";
      case "connected":
        return "Call in progress";
      case "ended":
        return "Call ended";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[5000] p-4 rounded-full backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 border border-black-300 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Open chatbot"
      >
        <motion.div
          animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <FaXmark className="w-6 h-6 text-white group-hover:text-purple transition-colors duration-300" />
          ) : (
            <FaComments className="w-6 h-6 text-white group-hover:text-purple transition-colors duration-300" />
          )}
        </motion.div>
        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-purple rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 right-8 z-[5000] w-96 h-[600px] rounded-2xl backdrop-blur-xl saturate-180 bg-opacity-90 bg-black-200 border border-black-300 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-black-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center">
                  <FaComments className="w-5 h-5 text-purple" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-xs text-white-200">
                    {callStatus === "connected" ? "On call" : "Online"}
                  </p>
                </div>
              </div>
              {callStatus === "idle" && (
                <button
                  onClick={makeCall}
                  className="p-2 rounded-lg bg-purple/20 hover:bg-purple/30 transition-colors"
                  aria-label="Make call"
                >
                  <FaPhone className="w-4 h-4 text-purple" />
                </button>
              )}
            </div>

            {/* Call Status Banner */}
            {callStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={cn(
                  "px-4 py-2 text-center text-sm font-medium",
                  callStatus === "connected"
                    ? "bg-green-500/20 text-green-400"
                    : callStatus === "ringing" && isIncomingCall
                    ? "bg-purple/20 text-purple"
                    : "bg-yellow-500/20 text-yellow-400"
                )}
              >
                {getCallStatusText()}
              </motion.div>
            )}

            {/* Incoming Call Alert */}
            <AnimatePresence>
              {isIncomingCall && callStatus === "ringing" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-purple/10 border-b border-purple/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-purple/30 flex items-center justify-center"
                    >
                      <FaPhone className="w-5 h-5 text-purple" />
                    </motion.div>
                    <div>
                      <p className="text-white font-medium">Incoming Call</p>
                      <p className="text-xs text-white-200">AI Assistant</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={rejectCall}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                      aria-label="Reject call"
                    >
                      <FaPhoneSlash className="w-4 h-4 text-red-400" />
                    </button>
                    <button
                      onClick={answerCall}
                      className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors"
                      aria-label="Answer call"
                    >
                      <FaPhone className="w-4 h-4 text-green-400" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      message.sender === "user"
                        ? "bg-purple text-white"
                        : "bg-black-300 text-white-100 border border-black-300"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Call Controls */}
            {callStatus === "connected" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border-t border-black-300 flex items-center justify-center gap-4"
              >
                <button
                  onClick={toggleMute}
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    isMuted
                      ? "bg-red-500/20 hover:bg-red-500/30"
                      : "bg-black-300 hover:bg-black-200"
                  )}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <FaMicrophoneSlash className="w-5 h-5 text-red-400" />
                  ) : (
                    <FaMicrophone className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={endCall}
                  className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                  aria-label="End call"
                >
                  <FaPhoneSlash className="w-5 h-5 text-red-400" />
                </button>
              </motion.div>
            )}

            {/* Input Area */}
            {callStatus === "idle" && (
              <div className="p-4 border-t border-black-300 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-black-300 border border-black-300 rounded-lg px-4 py-2 text-white placeholder-white-200 focus:outline-none focus:ring-2 focus:ring-purple/50"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-purple/20 hover:bg-purple/30 transition-colors"
                  aria-label="Send message"
                >
                  <FaArrowUp className="w-4 h-4 text-purple rotate-[-45deg]" />
                </button>
              </div>
            )}

            {/* Hidden audio elements */}
            <audio ref={localAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
