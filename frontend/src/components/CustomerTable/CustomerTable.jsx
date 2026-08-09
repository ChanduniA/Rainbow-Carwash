import React from 'react';
import { motion } from 'framer-motion';
import ActionMenu from '../ActionMenu/ActionMenu';
import styles from './CustomerTable.module.css';

const defaultCustomers = [
  {
    id: 'c1',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'VIP Collector',
    purchases: 3,
    spent: 384000
  },
  {
    id: 'c2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 432-1098',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'Active Buyer',
    purchases: 2,
    spent: 195000
  },
  {
    id: 'c3',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'VIP Collector',
    purchases: 4,
    spent: 520000
  }
];

const CustomerTable = ({ customers = defaultCustomers, onView, onEdit, onDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.tableTitle}>Registered Client Directory</h3>
        <span className={styles.countBadge}>{customers.length} VIP Clients</span>
      </div>

      <div className={styles.responsiveOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status Tier</th>
              <th>Vehicles Purchased</th>
              <th>Total Volume</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--color-bg)' }}
              >
                <td>
                  <div className={styles.clientCell}>
                    <img src={c.avatar} alt={c.name} className={styles.avatar} />
                    <strong className={styles.name}>{c.name}</strong>
                  </div>
                </td>

                <td>
                  <span className={styles.emailText}>{c.email}</span>
                </td>

                <td>
                  <span className={styles.phoneText}>{c.phone}</span>
                </td>

                <td>
                  <span className={styles.tierBadge}>{c.status}</span>
                </td>

                <td>
                  <span className={styles.purchasesBadge}>{c.purchases} Cars</span>
                </td>

                <td>
                  <strong className={styles.spentText}>${c.spent?.toLocaleString()}</strong>
                </td>

                <td className={styles.alignRight}>
                  <ActionMenu
                    onView={() => onView && onView(c.id)}
                    onEdit={() => onEdit && onEdit(c.id)}
                    onDelete={() => onDelete && onDelete(c.id)}
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

export default CustomerTable;
