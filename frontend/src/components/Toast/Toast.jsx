import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

const iconMap = {
  success: CheckCircle2,
  warning: AlertCircle,
  danger: XCircle,
  info: Info
};

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;
  const Icon = iconMap[type] || CheckCircle2;

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.toast} ${styles[type]}`}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
      >
        <Icon size={18} className={styles.toastIcon} />
        <span className={styles.message}>{message}</span>
        {onClose && (
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
