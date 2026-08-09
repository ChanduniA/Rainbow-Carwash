import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SecondaryButton.module.css';

const SecondaryButton = ({
  children,
  onClick,
  type = 'button',
  to,
  fullWidth = false,
  disabled = false,
  icon: Icon,
  variant = 'outline', // 'outline' | 'dark' | 'light'
  className = ''
}) => {
  let navigate = null;
  try {
    navigate = useNavigate();
  } catch (e) {
    // Router context fallback
  }

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (to && navigate) {
      navigate(to);
    } else if (to) {
      window.location.href = to;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.secondaryBtn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
    >
      {Icon && <Icon className={styles.icon} size={18} />}
      <span>{children}</span>
    </motion.button>
  );
};

export default SecondaryButton;
