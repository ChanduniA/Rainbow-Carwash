import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, MapPin, Gauge, Calendar, ArrowRight } from 'lucide-react';
import styles from './SavedVehicleCard.module.css';

const SavedVehicleCard = ({ vehicle, onRemove, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.imageWrapper}>
        <img src={vehicle.image} alt={vehicle.name} className={styles.image} />
        <span className={styles.yearTag}>{vehicle.year}</span>

        {/* Favorite toggle */}
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.favBtn} ${isFavorite ? styles.isFav : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          title="Toggle Favorite"
        >
          <Heart size={16} fill={isFavorite ? '#EF4444' : 'none'} color={isFavorite ? '#EF4444' : '#FFFFFF'} />
        </button>

        {/* Remove button */}
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.removeBtn}`}
          onClick={() => onRemove && onRemove(vehicle.id)}
          title="Remove from Saved"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className={styles.body}>
        <h4 className={styles.vehicleTitle}>{vehicle.name}</h4>
        <div className={styles.priceTag}>${vehicle.price?.toLocaleString()}</div>

        <div className={styles.specsRow}>
          <span>
            <Gauge size={14} /> {vehicle.mileage?.toLocaleString()} mi
          </span>
          <span>
            <Calendar size={14} /> {vehicle.transmission || 'Automatic'}
          </span>
        </div>

        <div className={styles.locationRow}>
          <MapPin size={14} className={styles.pinIcon} />
          <span>{vehicle.location || 'Miami Flagship Showroom'}</span>
        </div>

        <button
          type="button"
          className={styles.viewBtn}
          onClick={() => onViewDetails && onViewDetails(vehicle.id)}
        >
          <span>View Details</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default SavedVehicleCard;
