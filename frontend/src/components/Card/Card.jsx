import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

const Card = ({
  children,
  className = '',
  glass = false,
  hoverable = true,
  onClick
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -6 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`${styles.card} ${glass ? styles.glass : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
