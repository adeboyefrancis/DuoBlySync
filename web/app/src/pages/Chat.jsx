import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Search, Circle } from "lucide-react";
import { axios } from "@/api/DuoBlySyncClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DEMO_CONTACTS = [
  {
    id: "c1",
    name: "Sarah Chen",
    role: "Mentor",
    emoji: "👩‍💻",
    color: "from-cyan-400 to-blue-500",
    online: true,
    lastMessage: "See you at the session tomorrow!",
  },
  {
    id: "c2",
    name: "Marcus Lee",
    role: "Mentor",
    emoji: "👨‍🔬",
    color: "from-purple-400 to-indigo-500",
    online: false,
    lastMessage: "Great work on that Python script.",
  },
  {
    id: "c3",
    name: "Aisha Okonkwo",
    role: "Mentor",
    emoji: "👩‍💼",
    color: "from-amber-400 to-orange-500",
    online: true,
    lastMessage: "Let me know when you want to chat!",
  },
];

const DEMO_MESSAGES = {
  c1: [
    {
      id: 1,
      sender: "them",
      content: "Hey! Great to match with you 😊",
      time: "10:00",
    },
    {
      id: 2,
      sender: "me",
      content:
        "Hi Sarah! Really excited to work with you on cloud architecture.",
      time: "10:02",
    },
    {
      id: 3,
      sender: "them",
      content:
        "Awesome! I looked at your profile — you have a solid DevOps foundation. AWS should come naturally.",
      time: "10:04",
    },
    {
      id: 4,
      sender: "me",
      content: "That's encouraging! When can we schedule our first session?",
      time: "10:05",
    },
    {
      id: 5,
      sender: "them",
      content: "See you at the session tomorrow!",
      time: "10:10",
    },
  ],
  c2: [
    {
      id: 1,
      sender: "them",
      content: "Welcome! Ready to dive into data science?",
      time: "Yesterday",
    },
    {
      id: 2,
      sender: "me",
      content: "Absolutely! I've been practicing Python pipelines.",
      time: "Yesterday",
    },
    {
      id: 3,
      sender: "them",
      content: "Great work on that Python script.",
      time: "Yesterday",
    },
  ],
  c3: [
    {
      id: 1,
      sender: "them",
      content: "Hi! Congrats on the match 🎉",
      time: "Mon",
    },
    {
      id: 2,
      sender: "me",
      content: "Thank you! Looking forward to learning from your PM journey.",
      time: "Mon",
    },
    {
      id: 3,
      sender: "them",
      content: "Let me know when you want to chat!",
      time: "Mon",
    },
  ],
};

export default function Chat() {
  const [activeContact, setActiveContact] = useState(DEMO_CONTACTS[0]);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [
        ...(prev[activeContact.id] || []),
        {
          id: Date.now(),
          sender: "me",
          content: text,
          time: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));
    setInput("");
  }

  const filtered = DEMO_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const thread = messages[activeContact.id] || [];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <p className="text-xs text-muted-foreground">
              {DEMO_CONTACTS.filter((c) => c.online).length} contacts online
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 border-r border-border flex flex-col shrink-0">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {filtered.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-secondary/60 transition-colors ${
                  activeContact.id === contact.id ? "bg-secondary" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-lg`}
                  >
                    {contact.emoji}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">
                    {contact.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-border bg-card/40 flex items-center gap-3 shrink-0">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${activeContact.color} flex items-center justify-center text-lg`}
            >
              {activeContact.emoji}
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">
                {activeContact.name}
              </p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Circle
                  className={`w-2 h-2 fill-current ${activeContact.online ? "text-emerald-500" : "text-muted-foreground"}`}
                />
                {activeContact.online ? "Online" : "Offline"} ·{" "}
                {activeContact.role}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
            {thread.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex gap-2 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "them" && (
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${activeContact.color} flex items-center justify-center text-sm shrink-0 mt-0.5`}
                  >
                    {activeContact.emoji}
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border flex gap-3 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${activeContact.name}...`}
              className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-2 text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
