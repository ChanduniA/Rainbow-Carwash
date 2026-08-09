import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Users,
  RefreshCw,
  Calendar,
  Bot,
  FileBarChart,
  PieChart,
  MessageSquare,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const adminNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vehicles', label: 'Vehicles', icon: Car, count: 18 },
  { id: 'customers', label: 'Customers', icon: Users, count: 142 },
  { id: 'trade-ins', label: 'Trade-In Requests', icon: RefreshCw, badge: '5 New' },
  { id: 'bookings', label: 'Inspection Bookings', icon: Calendar, badge: '3 Pending' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'messages', label: 'Messages', icon: MessageSquare, count: 8 },
  { id: 'users', label: 'Users & Roles', icon: ShieldCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AdminSidebar = ({ activeTab, onSelectTab, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.topBrand}>
        <div className={styles.logoBadge}>RT</div>
        {!isCollapsed && (
          <div className={styles.brandMeta}>
            <h3 className={styles.brandTitle}>Rainbow Admin</h3>
            <span className={styles.brandSubtitle}>Executive Console</span>
          </div>
        )}
        <button
          type="button"
          className={styles.collapseToggle}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className={styles.navGroup}>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.activeItem : ''}`}
              onClick={() => onSelectTab(item.id)}
              whileHover={{ x: 3 }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} className={styles.icon} />
              {!isCollapsed && <span className={styles.label}>{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span className={styles.badge}>{item.badge}</span>
              )}
              {!isCollapsed && item.count !== undefined && (
                <span className={styles.countTag}>{item.count}</span>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className={styles.bottomSection}>
        <button type="button" className={styles.logoutBtn} onClick={onLogout}>
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
