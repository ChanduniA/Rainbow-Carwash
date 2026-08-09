import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress = 0, height = 8, showLabel = false, labelText = '' }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={styles.wrapper}>
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.labelText}>{labelText}</span>
          <span className={styles.percentageText}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={styles.track} style={{ height: `${height}px` }}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
