import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Sun, Moon, ShieldCheck, ChevronRight } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './AdminHeader.module.css';

const AdminHeader = ({
  title = "Executive Overview",
  breadcrumbs = ['Admin', 'Dashboard'],
  searchValue = '',
  onSearchChange,
  onNotificationClick,
  onMessageClick
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftMeta}>
        {/* Breadcrumb Trail */}
        <div className={styles.breadcrumbRow}>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={styles.crumb}>{crumb}</span>
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight size={12} className={styles.crumbArrow} />
              )}
            </React.Fragment>
          ))}
        </div>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.centerSearch}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Global search vehicles, customers, trade-in IDs, bookings..."
        />
      </div>

      <div className={styles.rightActions}>
        {/* Dark Mode Toggle */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} />}
        </button>

        {/* Message Icon */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onMessageClick}
          title="Admin Messages"
        >
          <MessageSquare size={18} />
          <span className={styles.msgBadge}>5</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onNotificationClick}
          title="Notifications"
        >
          <Bell size={18} />
          <span className={styles.bellBadge}>3</span>
        </button>

        {/* Admin Profile */}
        <div className={styles.adminProfile}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            alt="Executive Admin"
            className={styles.avatar}
          />
          <div className={styles.profileText}>
            <span className={styles.name}>Dominic Sterling</span>
            <span className={styles.role}>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
