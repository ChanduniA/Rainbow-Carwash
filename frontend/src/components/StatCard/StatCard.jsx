import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, subtext, icon: Icon, color = "#2563EB", trend }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.topRow}>
        <div className={styles.iconCircle} style={{ background: `${color}15`, color }}>
          {Icon && <Icon size={20} />}
        </div>
        {trend && (
          <span className={styles.trendBadge}>
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>

      <div className={styles.valueRow}>
        <h3 className={styles.value}>{value}</h3>
        <span className={styles.title}>{title}</span>
      </div>

      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </motion.div>
  );
};

export default StatCard;
