import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, Trash2, Bot } from 'lucide-react';
import styles from './ChatSidebar.module.css';

const ChatSidebar = ({
  conversations = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClearAllChats
}) => {
  return (
    <aside className={styles.sidebar}>
      {/* New Chat Button */}
      <motion.button
        type="button"
        className={styles.newChatBtn}
        onClick={onNewChat}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={18} />
        <span>New Chat Session</span>
      </motion.button>

      {/* Conversation History List */}
      <div className={styles.historySection}>
        <div className={styles.historyHeader}>
          <span>History</span>
          <button type="button" onClick={onClearAllChats} className={styles.clearBtn} title="Clear All History">
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className={styles.historyList}>
          {conversations.map((chat) => {
            const isActive = activeChatId === chat.id;

            return (
              <motion.div
                key={chat.id}
                className={`${styles.historyCard} ${isActive ? styles.activeHistory : ''}`}
                whileHover={{ x: 2 }}
              >
                <button
                  type="button"
                  className={styles.historyCardMain}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <MessageSquare size={16} className={styles.chatIcon} />
                  <div className={styles.chatMeta}>
                    <span className={styles.chatTitle}>{chat.title}</span>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={styles.deleteOneBtn}
                  title="Delete this conversation"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Assistant Version Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.botBadge}>
          <Bot size={16} /> Rainbow AI v2.4 (Automotive Engine)
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
