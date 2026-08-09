import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Heart,
  RefreshCw,
  Calendar,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import styles from './DashboardSidebar.module.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-vehicles', label: 'My Vehicles', icon: Car },
  { id: 'saved-vehicles', label: 'Saved Vehicles', icon: Heart, badge: 3 },
  { id: 'trade-ins', label: 'Trade-In Requests', icon: RefreshCw, badge: 1 },
  { id: 'inspections', label: 'Inspection Bookings', icon: Calendar, badge: 2 },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const DashboardSidebar = ({ activeTab, onSelectTab, onLogout }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandRow}>
        <div className={styles.brandBadge}>RT</div>
        <div>
          <h3 className={styles.brandTitle}>Rainbow Account</h3>
          <span className={styles.brandSub}>Customer Portal</span>
        </div>
      </div>

      <nav className={styles.navMenu}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              onClick={() => onSelectTab(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={18} className={styles.icon} />
              <span className={styles.label}>{item.label}</span>
              {item.badge && (
                <span className={`${styles.badge} ${isActive ? styles.activeBadge : ''}`}>
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className={styles.logoutWrapper}>
        <button type="button" className={styles.logoutBtn} onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
