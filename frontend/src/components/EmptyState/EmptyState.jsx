import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, RefreshCcw } from 'lucide-react';
import styles from './EmptyState.module.css';

const EmptyState = ({
  title = "No Results Found",
  subtitle = "We couldn't find any items matching your criteria. Try adjusting your filters or search terms.",
  icon: Icon = SearchX,
  actionLabel,
  onAction
}) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.iconCircle}>
        <Icon size={38} className={styles.icon} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>

      {actionLabel && (
        <button type="button" className={styles.actionBtn} onClick={onAction}>
          <RefreshCcw size={16} /> {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
