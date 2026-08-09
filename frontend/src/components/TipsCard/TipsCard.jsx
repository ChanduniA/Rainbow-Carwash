import React from 'react';
import { Lightbulb, CheckCircle2, ShieldCheck, TrendingUp, FileText } from 'lucide-react';
import styles from './TipsCard.module.css';

const defaultTips = [
  { id: 1, text: 'Gather original title, registration, and service records.' },
  { id: 2, text: 'Clean vehicle exterior & interior to highlight prime condition.' },
  { id: 3, text: 'Take high-resolution photos in bright daylight from all 4 angles.' },
  { id: 4, text: 'Include both key fobs and owner manuals for full appraisal credit.' },
  { id: 5, text: 'Disclose any minor scratches upfront for an accurate instant offer.' },
];

const TipsCard = ({ title = "Trade-In Tips & Checklist", tips = defaultTips }) => {
  return (
    <div className={styles.tipsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconBadge}>
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.subtitle}>Maximize your appraisal payout</span>
        </div>
      </div>

      <div className={styles.checklist}>
        {tips.map((tip) => (
          <div key={tip.id || tip.text} className={styles.checkItem}>
            <CheckCircle2 size={18} className={styles.checkIcon} />
            <span className={styles.tipText}>{tip.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.valuationBanner}>
        <div className={styles.bannerHeader}>
          <TrendingUp size={16} />
          <span>Real-Time Market Valuation</span>
        </div>
        <p className={styles.bannerText}>
          Our AI algorithm cross-references recent auction sales, regional inventory scarcity, and CARFAX history to provide top-market value.
        </p>
      </div>
    </div>
  );
};

export default TipsCard;
