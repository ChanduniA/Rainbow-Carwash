import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import styles from './TypingIndicator.module.css';

const TypingIndicator = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Bot size={16} />
      </div>
      <div className={styles.bubble}>
        <span className={styles.label}>AI Assistant is typing</span>
        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={styles.dot}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
