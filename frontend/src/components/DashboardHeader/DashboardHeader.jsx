import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Sun, Moon, Search, ShieldCheck } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './DashboardHeader.module.css';

const DashboardHeader = ({
  customerName = "Marcus Vance",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  unreadCount = 3,
  searchValue = "",
  onSearchChange,
  onNotificationClick
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftMeta}>
        <h2 className={styles.welcomeTitle}>
          Welcome Back, {customerName}!
        </h2>
        <div className={styles.statusBadge}>
          <ShieldCheck size={14} color="#22C55E" />
          <span>VIP Verified Account</span>
        </div>
      </div>

      <div className={styles.centerSearch}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search saved vehicles, bookings, requests..."
        />
      </div>

      <div className={styles.rightActions}>
        {/* Dark Mode Toggle */}
        <motion.button
          type="button"
          className={styles.themeToggleBtn}
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={20} color="#F59E0B" /> : <Moon size={20} />}
        </motion.button>

        {/* Notification Bell */}
        <div className={styles.bellWrapper}>
          <motion.button
            type="button"
            className={styles.iconBtn}
            onClick={onNotificationClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}</span>
            )}
          </motion.button>
        </div>


      </div>
    </header>
  );
};

export default DashboardHeader;
