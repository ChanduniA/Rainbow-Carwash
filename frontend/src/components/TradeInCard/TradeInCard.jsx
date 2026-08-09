import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, DollarSign, Calendar, FileText, ChevronRight } from 'lucide-react';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TradeInCard.module.css';

const defaultTradeIns = [
  {
    id: 'TRD-9012',
    vehicle: '2023 BMW M3 Competition',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    expectedPrice: 68500,
    offeredPrice: 71925,
    submittedDate: 'Jul 29, 2026',
    status: 'Valuation Complete',
    progress: 75
  },
  {
    id: 'TRD-7814',
    vehicle: '2021 Audi RS6 Avant',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80',
    expectedPrice: 92000,
    offeredPrice: 94500,
    submittedDate: 'Jul 15, 2026',
    status: 'In Desk Review',
    progress: 45
  }
];

const TradeInCard = ({ tradeIns = defaultTradeIns, onViewDetails }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.headerMeta}>
          <div className={styles.iconCircle}>
            <RefreshCw size={20} />
          </div>
          <div>
            <h3 className={styles.title}>My Trade-In Requests</h3>
            <span className={styles.sub}>Active vehicle appraisal requests</span>
          </div>
        </div>
      </div>

      <div className={styles.tradeList}>
        {tradeIns.map((item) => (
          <div key={item.id} className={styles.tradeItem}>
            <div className={styles.tradeTop}>
              <img src={item.image} alt={item.vehicle} className={styles.vehicleImg} />
              <div className={styles.tradeMeta}>
                <div className={styles.badgeRow}>
                  <span className={styles.tradeId}>#{item.id}</span>
                  <span className={styles.statusBadge}>{item.status}</span>
                </div>
                <strong className={styles.vehicleName}>{item.vehicle}</strong>
                <div className={styles.priceRow}>
                  <span>Expected: <strong>${item.expectedPrice?.toLocaleString()}</strong></span>
                  <span className={styles.offerTag}>Offer: <strong>${item.offeredPrice?.toLocaleString()}</strong></span>
                </div>
              </div>
            </div>

            <div className={styles.progressBlock}>
              <ProgressBar progress={item.progress} label={`Appraisal Progress: ${item.progress}%`} />
            </div>

            <div className={styles.tradeFooter}>
              <span className={styles.dateText}>
                <Calendar size={14} /> Submitted on {item.submittedDate}
              </span>
              <button
                type="button"
                className={styles.detailsBtn}
                onClick={() => onViewDetails && onViewDetails(item)}
              >
                View Valuation Certificate <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeInCard;
