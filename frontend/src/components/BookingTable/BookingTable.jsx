import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Eye, XCircle, CheckCircle2, Clock } from 'lucide-react';
import styles from './BookingTable.module.css';

const defaultBookings = [
  {
    id: 'BK-9981',
    vehicle: '2023 Porsche 911 GT3 RS',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
    date: 'Aug 14, 2026 at 10:00 AM',
    branch: 'Miami Flagship Center',
    status: 'Confirmed',
    statusType: 'success'
  },
  {
    id: 'BK-8742',
    vehicle: '2024 BMW M3 Competition',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    date: 'Aug 18, 2026 at 02:00 PM',
    branch: 'Orlando Luxury Lounge',
    status: 'Pending Review',
    statusType: 'warning'
  },
  {
    id: 'BK-6210',
    vehicle: '2022 Mercedes-AMG GT R',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
    date: 'Jul 28, 2026 at 11:00 AM',
    branch: 'Tampa Bay Hub',
    status: 'Completed',
    statusType: 'info'
  }
];

const BookingTable = ({ bookings = defaultBookings, onViewPass, onCancel }) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Recent Inspection Bookings</h3>
        <span className={styles.countBadge}>{bookings.length} Total Bookings</span>
      </div>

      <div className={styles.responsiveOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Inspection Date & Time</th>
              <th>Branch Location</th>
              <th>Status</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--color-bg)' }}
              >
                {/* Vehicle Cell */}
                <td>
                  <div className={styles.vehicleCell}>
                    <img src={item.image} alt={item.vehicle} className={styles.vehicleThumb} />
                    <div className={styles.vehicleInfo}>
                      <strong>{item.vehicle}</strong>
                      <span className={styles.passId}>ID: #{item.id}</span>
                    </div>
                  </div>
                </td>

                {/* Date Cell */}
                <td>
                  <div className={styles.dateCell}>
                    <Calendar size={15} />
                    <span>{item.date}</span>
                  </div>
                </td>

                {/* Branch Cell */}
                <td>
                  <div className={styles.branchCell}>
                    <MapPin size={15} />
                    <span>{item.branch}</span>
                  </div>
                </td>

                {/* Status Cell */}
                <td>
                  <span className={`${styles.statusBadge} ${styles[item.statusType]}`}>
                    {item.statusType === 'success' && <CheckCircle2 size={13} />}
                    {item.statusType === 'warning' && <Clock size={13} />}
                    {item.status}
                  </span>
                </td>

                {/* Actions Cell */}
                <td className={styles.alignRight}>
                  <div className={styles.actionGroup}>
                    <button
                      type="button"
                      className={styles.viewPassBtn}
                      onClick={() => onViewPass && onViewPass(item)}
                      title="View Pass"
                    >
                      <Eye size={14} /> Pass
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => onCancel && onCancel(item.id)}
                      title="Cancel Booking"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
