import React from 'react';
import { motion } from 'framer-motion';
import ActionMenu from '../ActionMenu/ActionMenu';
import styles from './InspectionTable.module.css';

const defaultBookings = [
  {
    id: 'BK-9981',
    customer: 'Marcus Vance',
    vehicle: '2023 Porsche 911 GT3 RS',
    branch: 'Miami Flagship Center',
    date: 'Aug 14, 2026',
    time: '10:00 AM',
    status: 'Confirmed'
  },
  {
    id: 'BK-8742',
    customer: 'Sarah Jenkins',
    vehicle: '2024 BMW M3 Competition',
    branch: 'Orlando Luxury Lounge',
    date: 'Aug 18, 2026',
    time: '02:00 PM',
    status: 'Pending'
  },
  {
    id: 'BK-6210',
    customer: 'Carlos Mendez',
    vehicle: '2022 Mercedes-AMG GT R',
    branch: 'Tampa Bay Hub',
    date: 'Jul 28, 2026',
    time: '11:00 AM',
    status: 'Completed'
  }
];

const InspectionTable = ({ bookings = defaultBookings, onApprove, onCancel, onComplete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.tableTitle}>Master Inspection Bookings</h3>
        <span className={styles.countBadge}>{bookings.length} Bookings</span>
      </div>

      <div className={styles.responsiveOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Branch Location</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--color-bg)' }}
              >
                <td>
                  <span className={styles.bookingId}>#{b.id}</span>
                </td>

                <td>
                  <strong className={styles.customerName}>{b.customer}</strong>
                </td>

                <td>
                  <span>{b.vehicle}</span>
                </td>

                <td>
                  <span className={styles.branchText}>{b.branch}</span>
                </td>

                <td>
                  <div className={styles.dateTime}>
                    <strong>{b.date}</strong>
                    <span>{b.time}</span>
                  </div>
                </td>

                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      b.status === 'Confirmed'
                        ? styles.confirmed
                        : b.status === 'Completed'
                        ? styles.completed
                        : styles.pending
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className={styles.alignRight}>
                  <ActionMenu
                    onApprove={() => onApprove && onApprove(b.id)}
                    onReject={() => onCancel && onCancel(b.id)}
                    onView={() => onComplete && onComplete(b.id)}
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

export default InspectionTable;
