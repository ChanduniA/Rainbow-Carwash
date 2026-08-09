import React from 'react';
import { motion } from 'framer-motion';
import ActionMenu from '../ActionMenu/ActionMenu';
import styles from './VehicleTable.module.css';

const VehicleTable = ({ vehicles = [], onEdit, onDelete, onView }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.tableTitle}>Vehicle Management Inventory</h3>
        <span className={styles.countBadge}>{vehicles.length} Vehicles</span>
      </div>

      <div className={styles.responsiveOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Brand & Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <motion.tr
                key={v.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--color-bg)' }}
              >
                {/* Vehicle Cell */}
                <td>
                  <div className={styles.vehicleCell}>
                    <img src={v.image} alt={v.name} className={styles.thumb} />
                    <div className={styles.vehicleMeta}>
                      <strong className={styles.vehicleName}>{v.name}</strong>
                      <span className={styles.vinText}>{v.transmission} &bull; {v.fuelType}</span>
                    </div>
                  </div>
                </td>

                {/* Brand & Model */}
                <td>
                  <div className={styles.brandCell}>
                    <strong>{v.brand}</strong>
                    <span>{v.model}</span>
                  </div>
                </td>

                {/* Year */}
                <td>
                  <span className={styles.yearBadge}>{v.year}</span>
                </td>

                {/* Price */}
                <td>
                  <strong className={styles.priceText}>${v.price?.toLocaleString()}</strong>
                </td>

                {/* Status */}
                <td>
                  <span className={`${styles.statusBadge} ${v.isFeatured ? styles.available : styles.sold}`}>
                    {v.isFeatured ? 'Available' : 'Reserved'}
                  </span>
                </td>

                {/* Actions */}
                <td className={styles.alignRight}>
                  <ActionMenu
                    onView={() => onView && onView(v.id)}
                    onEdit={() => onEdit && onEdit(v.id)}
                    onDelete={() => onDelete && onDelete(v.id)}
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

export default VehicleTable;
