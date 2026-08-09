import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import styles from './MessageInput.module.css';

const MessageInput = ({ onSendMessage, isTyping }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isTyping) return;

    onSendMessage({ text: text.trim() });

    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        {/* Text Field */}
        <textarea
          rows={1}
          className={styles.textarea}
          placeholder="Ask AI Assistant about prices, specifications, trade-ins, or inspections..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send Button */}
        <motion.button
          type="submit"
          className={styles.sendBtn}
          disabled={!text.trim() || isTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Send Message"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </form>
  );
};

export default MessageInput;
