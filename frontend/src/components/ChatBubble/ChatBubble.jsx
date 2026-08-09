import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, CheckCheck } from 'lucide-react';
import styles from './ChatBubble.module.css';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      className={`${styles.bubbleWrapper} ${isUser ? styles.userWrapper : styles.aiWrapper}`}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      {!isUser && (
        <div className={styles.avatarAi}>
          <Bot size={18} />
        </div>
      )}

      <div className={`${styles.bubbleCard} ${isUser ? styles.userCard : styles.aiCard}`}>
        {/* Message Text */}
        <p className={styles.messageText}>{message.text}</p>

        {/* Action card/link inside AI response if present */}
        {message.actionLink && (
          <a href={message.actionLink.url} className={styles.actionBadge}>
            {message.actionLink.label} &rarr;
          </a>
        )}

        {/* Meta Row: Timestamp and Read Status */}
        <div className={styles.metaRow}>
          <span className={styles.timestamp}>{message.timestamp || 'Just now'}</span>
          {isUser && (
            <span className={styles.readStatus} title="Read">
              <CheckCheck size={14} />
            </span>
          )}
        </div>
      </div>

      {isUser && (
        <div className={styles.avatarUser}>
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatBubble;
