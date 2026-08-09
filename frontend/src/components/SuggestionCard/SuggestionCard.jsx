import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from './SuggestionCard.module.css';

const SuggestionCard = ({ text, icon: Icon, onClick }) => {
  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={() => onClick(text)}
      whileHover={{ y: -4, borderColor: 'var(--color-primary)' }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={styles.iconCircle}>
        {Icon ? <Icon size={18} /> : <Sparkles size={18} />}
      </div>
      <span className={styles.text}>{text}</span>
      <ArrowRight size={16} className={styles.arrowIcon} />
    </motion.button>
  );
};

export default SuggestionCard;
