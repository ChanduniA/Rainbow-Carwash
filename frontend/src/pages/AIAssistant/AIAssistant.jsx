import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Settings, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import QuickActionCard from '../../components/QuickActionCard/QuickActionCard';
import styles from './AIAssistant.module.css';

// Everything is persisted under this one key so the chat survives navigating
// away to other pages and coming back (localStorage, not component state).
const STORAGE_KEY = 'rainbowTraders.aiAssistant.v1';

const makeDefaultState = () => {
  const firstId = `c-${Date.now()}`;
  return {
    conversations: [{ id: firstId, title: 'New Conversation', time: 'Just now' }],
    activeChatId: firstId,
    messagesByChat: { [firstId]: [] }
  };
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

const AIAssistant = () => {
  const initial = useRef(loadState());

  const [conversations, setConversations] = useState(initial.current.conversations);
  const [activeChatId, setActiveChatId] = useState(initial.current.activeChatId);
  const [messagesByChat, setMessagesByChat] = useState(initial.current.messagesByChat);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // The messages for whichever chat is currently selected.
  const messages = messagesByChat[activeChatId] || [];

  // Persist to localStorage any time the chat data changes, so it survives
  // navigating to other pages and coming back.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ conversations, activeChatId, messagesByChat })
      );
    } catch (e) {
      console.warn('Could not save AI chat state.', e);
    }
  }, [conversations, activeChatId, messagesByChat]);

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

  // Deletes ONE chat only — the one the user clicked delete on.
  const handleDeleteChat = (chatId) => {
    setConversations((prev) => {
      const remaining = prev.filter((c) => c.id !== chatId);

      setMessagesByChat((prevMsgs) => {
        const updated = { ...prevMsgs };
        delete updated[chatId];
        return updated;
      });

      // If we just deleted the active chat, fall back to the next one in
      // the list, or spin up a brand new empty chat if none are left.
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

  // Wipes every conversation and starts over with a single fresh chat.
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

    // Update conversation title if first message
    if (currentMessages.length === 0 && userMsgObj.text) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, title: userMsgObj.text.slice(0, 30) } : c))
      );
    }

    // Call the real backend chatbot endpoint
    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMsgObj.text,
        history: updatedMessages.slice(-6) // last few turns for context
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
    <div className={styles.aiPage}>
      <PageHeader
        title="AI Assistant"
        subtitle="Ask anything about buying, selling or trading vehicles."
        breadcrumbs={[{ label: 'AI Concierge' }]}
      />

      <Container className={styles.containerPadding}>
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
            <button type="button" className={styles.headerBtn} onClick={() => setShowSettingsModal(true)}>
              <Settings size={16} /> Settings
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

        {/* Main 3-Column Layout */}
        <div className={styles.chatLayout}>
          {/* Left Sidebar */}
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

          {/* Center Main Chat Window */}
          <div className={styles.centerCol}>
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              onSelectPrompt={handlePromptClick}
            />
          </div>

          {/* Right Quick Actions Sidebar */}
          <div className={styles.rightCol}>
            <QuickActionCard onPromptClick={handlePromptClick} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AIAssistant;
