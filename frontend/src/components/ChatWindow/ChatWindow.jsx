import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Car, Calendar, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import ChatBubble from '../ChatBubble/ChatBubble';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import SuggestionCard from '../SuggestionCard/SuggestionCard';
import MessageInput from '../MessageInput/MessageInput';
import styles from './ChatWindow.module.css';

const suggestionsList = [
  { text: "Find SUVs under $30,000", icon: Car },
  { text: "Compare Toyota and Honda", icon: Layers },
  { text: "How do I book an inspection?", icon: Calendar },
  { text: "How does the trade-in process work?", icon: RefreshCw },
  { text: "Latest Luxury Arrivals", icon: Sparkles }
];

const ChatWindow = ({ messages = [], isTyping, onSendMessage, onSelectPrompt }) => {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    // Scroll only inside this chat box, not the whole page.
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={styles.windowContainer}>
      {/* Scrollable Message List / Welcome Screen */}
      <div className={styles.messagesScrollArea} ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className={styles.welcomeState}>
            <div className={styles.botIconWrapper}>
              <Bot size={44} className={styles.botIcon} />
            </div>
            <h2 className={styles.welcomeTitle}>How can I help you today?</h2>
            <p className={styles.welcomeSubtitle}>
              I am your personal Rainbow Traders AI Concierge. Ask me anything about vehicle inventory, pricing, specs, or how trade-ins and inspections work.
            </p>

            <div className={styles.suggestionsContainer}>
              <span className={styles.suggestionsHeader}>
                <Sparkles size={16} /> Suggested Questions to Get Started
              </span>
              <div className={styles.suggestionsGrid}>
                {suggestionsList.map((item, idx) => (
                  <SuggestionCard
                    key={idx}
                    text={item.text}
                    icon={item.icon}
                    onClick={onSelectPrompt}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Fixed Message Input Bar at bottom */}
      <div className={styles.inputArea}>
        <MessageInput onSendMessage={onSendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default ChatWindow;
