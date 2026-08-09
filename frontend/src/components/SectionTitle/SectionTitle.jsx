import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

const SectionTitle = ({
  badge,
  title,
  subtitle,
  center = true,
  dark = false,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`${styles.titleWrapper} ${center ? styles.center : ''} ${dark ? styles.dark : ''} ${className}`}
    >
      {badge && <span className={styles.badge}>{badge}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
};

export default SectionTitle;
