import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Calendar, DollarSign, ShieldCheck, Tag } from 'lucide-react';
import styles from './NotificationCard.module.css';

const defaultNotifications = [
  {
    id: 'n1',
    title: 'Inspection Appointment Confirmed',
    message: 'Your inspection pass for 2023 Porsche 911 GT3 RS is set for Aug 14 at 10:00 AM.',
    time: '10 mins ago',
    unread: true,
    icon: Calendar,
    color: '#2563EB'
  },
  {
    id: 'n2',
    title: 'Trade-In Valuation Ready',
    message: 'Your 2023 BMW M3 appraisal offer has been generated: $71,925 guaranteed payout.',
    time: '2 hours ago',
    unread: true,
    icon: DollarSign,
    color: '#22C55E'
  },
  {
    id: 'n3',
    title: 'Price Drop Alert!',
    message: '2024 Audi RS6 Avant saved in your favorites had a $3,500 price reduction.',
    time: '1 day ago',
    unread: false,
    icon: Tag,
    color: '#F59E0B'
  }
];

const NotificationCard = ({
  notifications = defaultNotifications,
  onMarkAllRead
}) => {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitleRow}>
          <Bell size={20} className={styles.bellIcon} />
          <h3 className={styles.title}>Notifications</h3>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount} New</span>
          )}
        </div>
        <button type="button" className={styles.markReadBtn} onClick={onMarkAllRead}>
          <CheckCheck size={16} /> Mark All Read
        </button>
      </div>

      <div className={styles.list}>
        {notifications.map((item) => {
          const Icon = item.icon || Bell;

          return (
            <motion.div
              key={item.id}
              className={`${styles.item} ${item.unread ? styles.unreadItem : ''}`}
              whileHover={{ x: 2 }}
            >
              <div className={styles.iconCircle} style={{ background: `${item.color}15`, color: item.color }}>
                <Icon size={18} />
              </div>
              <div className={styles.content}>
                <div className={styles.itemTitleRow}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemTime}>{item.time}</span>
                </div>
                <p className={styles.itemMessage}>{item.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationCard;
