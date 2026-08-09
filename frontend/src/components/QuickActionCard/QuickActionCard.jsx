import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, RefreshCw, Headphones, ArrowRight, HelpCircle, History, Lightbulb } from 'lucide-react';
import styles from './QuickActionCard.module.css';

const quickActionsList = [
  { id: 'search', title: 'Vehicle Search', path: '/inventory', icon: Search, color: '#2563EB' },
  { id: 'inspection', title: 'Inspection Booking', path: '/inspection', icon: Calendar, color: '#22C55E' },
  { id: 'trade', title: 'Trade-In Appraisal', path: '/trade-in', icon: RefreshCw, color: '#F59E0B' },
  { id: 'support', title: 'Customer Support', path: '/contact', icon: Headphones, color: '#8B5CF6' }
];

const defaultPopular = [
  "What is the trade-in bonus for BMW M Series?",
  "How to prepare for 150-point inspection?",
  "Are electric vehicles eligible for instant escrow credit?"
];

const defaultRecent = [
  "Porsche 911 GT3 RS price drop",
  "Miami Flagship branch location",
  "Tesla Model S Plaid 0-60"
];

const QuickActionCard = ({ onActionClick, onPromptClick }) => {
  return (
    <div className={styles.container}>
      {/* Quick Actions Block */}
      <div className={styles.sectionCard}>
        <h4 className={styles.sectionTitle}>Quick Actions</h4>
        <div className={styles.actionsGrid}>
          {quickActionsList.map((act) => {
            const Icon = act.icon;
            return (
              <motion.a
                key={act.id}
                href={act.path}
                className={styles.actionBtn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.actionIconBadge} style={{ background: `${act.color}15`, color: act.color }}>
                  <Icon size={18} />
                </div>
                <span className={styles.actionLabel}>{act.title}</span>
                <ArrowRight size={14} className={styles.arrow} />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Popular Questions Block */}
      <div className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <HelpCircle size={16} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>Popular Questions</h4>
        </div>
        <div className={styles.questionsList}>
          {defaultPopular.map((q, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.questionItem}
              onClick={() => onPromptClick && onPromptClick(q)}
            >
              <span>{q}</span>
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches Block */}
      <div className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <History size={16} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>Recent Searches</h4>
        </div>
        <div className={styles.tagsFlex}>
          {defaultRecent.map((tag, idx) => (
            <span
              key={idx}
              className={styles.tagBadge}
              onClick={() => onPromptClick && onPromptClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tips Card Block */}
      <div className={styles.tipBox}>
        <div className={styles.tipHeader}>
          <Lightbulb size={18} color="#F59E0B" />
          <strong>AI Pro Tip</strong>
        </div>
        <p className={styles.tipText}>
          Specify year, budget, or preferred body style in your prompt (e.g. <em>"Show me 2023 Audi SUVs with under 10k miles"</em>) for hyper-accurate matches.
        </p>
      </div>
    </div>
  );
};

export default QuickActionCard;
