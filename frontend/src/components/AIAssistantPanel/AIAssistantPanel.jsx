import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Settings, CheckCircle2 } from 'lucide-react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import ChatWindow from '../ChatWindow/ChatWindow';
import QuickActionCard from '../QuickActionCard/QuickActionCard';
import styles from './AIAssistantPanel.module.css';

const makeDefaultState = () => {
  const firstId = `c-${Date.now()}`;
  return {
    conversations: [{ id: firstId, title: 'New Conversation', time: 'Just now' }],
    activeChatId: firstId,
    messagesByChat: { [firstId]: [] }
  };
};

const loadState = (storageKey) => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return makeDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed.conversations || !parsed.activeChatId || !parsed.messagesByChat) {
      return makeDefaultState();
    }
    return parsed;
  } catch (e) {
    console.warn('Could not read saved AI chat state, starting fresh.', e);
    return makeDefaultState();
  }
};

// Reusable AI Assistant chat panel (sidebar + chat window + quick actions).
// Used on the customer-facing AI Assistant page AND the admin dashboard's
// "AI Assistant" tab. Pass a unique `storageKey` so each surface keeps its
// own separate chat history (customer chats never mix with admin chats).
const AIAssistantPanel = ({
  storageKey = 'rainbowTraders.aiAssistant.v1',
  showQuickActions = true
}) => {
  const initial = useRef(loadState(storageKey));

  const [conversations, setConversations] = useState(initial.current.conversations);
  const [activeChatId, setActiveChatId] = useState(initial.current.activeChatId);
  const [messagesByChat, setMessagesByChat] = useState(initial.current.messagesByChat);
  const [isTyping, setIsTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const messages = messagesByChat[activeChatId] || [];

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ conversations, activeChatId, messagesByChat })
      );
    } catch (e) {
      console.warn('Could not save AI chat state.', e);
    }
  }, [conversations, activeChatId, messagesByChat, storageKey]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNewChat = () => {
    const newId = `c-${Date.now()}`;
    const newChatObj = { id: newId, title: 'New Conversation', time: 'Just now' };
    setConversations((prev) => [newChatObj, ...prev]);
    setMessagesByChat((prev) => ({ ...prev, [newId]: [] }));
    setActiveChatId(newId);
    showToast('New AI Chat session initialized.');
  };

  const handleDeleteChat = (chatId) => {
    setConversations((prev) => {
      const remaining = prev.filter((c) => c.id !== chatId);

      setMessagesByChat((prevMsgs) => {
        const updated = { ...prevMsgs };
        delete updated[chatId];
        return updated;
      });

      if (chatId === activeChatId) {
        if (remaining.length > 0) {
          setActiveChatId(remaining[0].id);
        } else {
          const newId = `c-${Date.now()}`;
          setActiveChatId(newId);
          setMessagesByChat((prevMsgs) => ({ ...prevMsgs, [newId]: [] }));
          return [{ id: newId, title: 'New Conversation', time: 'Just now' }];
        }
      }

      return remaining;
    });
    showToast('Conversation deleted.');
  };

  const handleClearAllChats = () => {
    const fresh = makeDefaultState();
    setConversations(fresh.conversations);
    setActiveChatId(fresh.activeChatId);
    setMessagesByChat(fresh.messagesByChat);
    showToast('All conversation logs cleared.');
  };

  const handleSendMessage = (userMsgObj) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userMsgObj.text,
      timestamp
    };

    const currentMessages = messagesByChat[activeChatId] || [];
    const updatedMessages = [...currentMessages, userMsg];
    setMessagesByChat((prev) => ({ ...prev, [activeChatId]: updatedMessages }));
    setIsTyping(true);

    if (currentMessages.length === 0 && userMsgObj.text) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, title: userMsgObj.text.slice(0, 30) } : c))
      );
    }

    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMsgObj.text,
        history: updatedMessages.slice(-6)
      })
    })
      .then((res) => res.json())
      .then((data) => {
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply || "Sorry, I couldn't process that right now.",
          actionLink: data.actionLink || null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessagesByChat((prev) => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), aiMsg]
        }));
      })
      .catch((err) => {
        console.error('Chat request failed:', err);
        const errorMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I'm having trouble connecting right now. Please make sure the backend server is running and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessagesByChat((prev) => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), errorMsg]
        }));
      })
      .finally(() => setIsTyping(false));
  };

  const handlePromptClick = (promptText) => {
    handleSendMessage({ text: promptText });
  };

  return (
    <div className={styles.panelRoot}>
      {/* Header Action Bar */}
      <div className={styles.headerBar}>
        <div className={styles.statusGroup}>
          <span className={styles.onlineDot}>●</span>
          <span className={styles.statusText}>AI System Online & Listening</span>
        </div>

        <div className={styles.headerButtons}>
          <button type="button" className={styles.headerBtn} onClick={handleNewChat}>
            <Plus size={16} /> New Chat
          </button>
          <button type="button" className={styles.headerBtn} onClick={() => handleDeleteChat(activeChatId)}>
            <Trash2 size={16} /> Delete This Chat
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className={`${styles.chatLayout} ${!showQuickActions ? styles.noQuickActions : ''}`}>
        <div className={styles.leftCol}>
          <ChatSidebar
            conversations={conversations}
            activeChatId={activeChatId}
            onSelectChat={(id) => setActiveChatId(id)}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
            onClearAllChats={handleClearAllChats}
          />
        </div>

        <div className={styles.centerCol}>
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            onSelectPrompt={handlePromptClick}
          />
        </div>

        {showQuickActions && (
          <div className={styles.rightCol}>
            <QuickActionCard onPromptClick={handlePromptClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
