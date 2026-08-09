import React from 'react';
import { motion } from 'framer-motion';
import ActionMenu from '../ActionMenu/ActionMenu';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TradeInTable.module.css';

const defaultTradeIns = [
  {
    id: 'TRD-9012',
    customer: 'Marcus Vance',
    vehicle: '2023 BMW M3 Competition',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    expectedPrice: 68500,
    offeredPrice: 71925,
    status: 'Valuation Complete',
    progress: 75
  },
  {
    id: 'TRD-7814',
    customer: 'Elena Rostova',
    vehicle: '2021 Audi RS6 Avant',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80',
    expectedPrice: 92000,
    offeredPrice: 94500,
    status: 'Desk Review',
    progress: 45
  },
  {
    id: 'TRD-5521',
    customer: 'David Chen',
    vehicle: '2022 Porsche Taycan Turbo S',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
    expectedPrice: 135000,
    offeredPrice: 138000,
    status: 'Offer Pending',
    progress: 90
  }
];

const TradeInTable = ({ tradeIns = defaultTradeIns, onApprove, onReject, onView }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.tableTitle}>Trade-In Appraisal Submissions</h3>
        <span className={styles.badge}>{tradeIns.length} Active Appraisals</span>
      </div>

      <div className={styles.responsiveOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Customer</th>
              <th>Expected Price</th>
              <th>Offered Payout</th>
              <th>Appraisal Progress</th>
              <th>Status</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tradeIns.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--color-bg)' }}
              >
                <td>
                  <div className={styles.vehicleCell}>
                    <img src={item.image} alt={item.vehicle} className={styles.thumb} />
                    <div className={styles.meta}>
                      <strong>{item.vehicle}</strong>
                      <span className={styles.sub}>#{item.id}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <strong className={styles.customerName}>{item.customer}</strong>
                </td>

                <td>
                  <span>${item.expectedPrice?.toLocaleString()}</span>
                </td>

                <td>
                  <strong className={styles.payoutText}>${item.offeredPrice?.toLocaleString()}</strong>
                </td>

                <td style={{ minWidth: '160px' }}>
                  <ProgressBar progress={item.progress} />
                </td>

                <td>
                  <span className={styles.statusBadge}>{item.status}</span>
                </td>

                <td className={styles.alignRight}>
                  <ActionMenu
                    onView={() => onView && onView(item.id)}
                    onApprove={() => onApprove && onApprove(item.id)}
                    onReject={() => onReject && onReject(item.id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeInTable;
