import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Zap, Fuel, ShieldCheck, MapPin } from 'lucide-react';
import styles from './VehicleInfoCard.module.css';

const VehicleInfoCard = ({ vehicle, onSelectOther }) => {
  if (!vehicle) return null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageContainer}>
        <img src={vehicle.image} alt={vehicle.name} className={styles.vehicleImage} />
        <div className={styles.imageBadge}>
          <ShieldCheck size={16} /> 150-Point Certified
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <div>
            <span className={styles.brandTag}>{vehicle.brand}</span>
            <h3 className={styles.title}>{vehicle.name}</h3>
            {vehicle.location && (
              <span className={styles.locationTag}>
                <MapPin size={12} /> {vehicle.location}
              </span>
            )}
          </div>
          <div className={styles.priceTag}>
            <span className={styles.priceLabel}>Retail Price</span>
            <span className={styles.priceValue}>${vehicle.price?.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <Calendar size={16} className={styles.specIcon} />
            <span className={styles.specLabel}>Year</span>
            <strong className={styles.specValue}>{vehicle.year}</strong>
          </div>

          <div className={styles.specItem}>
            <Gauge size={16} className={styles.specIcon} />
            <span className={styles.specLabel}>Mileage</span>
            <strong className={styles.specValue}>{vehicle.mileage}</strong>
          </div>

          <div className={styles.specItem}>
            <Zap size={16} className={styles.specIcon} />
            <span className={styles.specLabel}>Transmission</span>
            <strong className={styles.specValue}>{vehicle.transmission}</strong>
          </div>

          <div className={styles.specItem}>
            <Fuel size={16} className={styles.specIcon} />
            <span className={styles.specLabel}>Fuel Type</span>
            <strong className={styles.specValue}>{vehicle.fuel}</strong>
          </div>
        </div>

        {onSelectOther && (
          <div className={styles.footerRow}>
            <button type="button" className={styles.changeVehicleBtn} onClick={onSelectOther}>
              Switch Selected Vehicle
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VehicleInfoCard;
