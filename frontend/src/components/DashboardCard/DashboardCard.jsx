import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './DashboardCard.module.css';

const DashboardCard = ({ title, value, change, trend = 'up', icon: Icon, color = "#2563EB", period = "vs last month" }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.topRow}>
        <span className={styles.title}>{title}</span>
        <div className={styles.iconCircle} style={{ background: `${color}15`, color }}>
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div className={styles.valueRow}>
        <h3 className={styles.value}>{value}</h3>
      </div>

      <div className={styles.bottomRow}>
        {change && (
          <span className={`${styles.changeBadge} ${trend === 'down' ? styles.negative : styles.positive}`}>
            {trend === 'down' ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
            {change}
          </span>
        )}
        <span className={styles.periodText}>{period}</span>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
