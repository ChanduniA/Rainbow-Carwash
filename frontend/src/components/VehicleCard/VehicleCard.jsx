import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gauge, Fuel, ShieldCheck, MapPin, ArrowRightLeft } from 'lucide-react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import styles from './VehicleCard.module.css';

const VehicleCard = ({ vehicle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img src={vehicle.image} alt={vehicle.name} className={styles.image} />
        <div className={styles.overlayTag}>Verified</div>

        <div className={styles.topActions}>
          <button
            className={`${styles.iconActionBtn} ${isCompared ? styles.activeCompare : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsCompared(!isCompared);
            }}
            title={isCompared ? "Remove from Compare" : "Add to Compare"}
            aria-label="Compare vehicle"
          >
            <ArrowRightLeft size={16} color={isCompared ? '#2563EB' : '#FFFFFF'} />
          </button>

          <button
            className={`${styles.iconActionBtn} ${isFavorite ? styles.activeFavorite : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            aria-label="Add to favorites"
          >
            <Heart size={16} fill={isFavorite ? '#EF4444' : 'none'} color={isFavorite ? '#EF4444' : '#FFFFFF'} />
          </button>
        </div>

        <div className={styles.priceTag}>${vehicle.price.toLocaleString()}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{vehicle.name}</h3>
          <p className={styles.location}>
            <MapPin size={14} /> {vehicle.location}
          </p>
        </div>

        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <Calendar size={14} className={styles.specIcon} />
            <span>{vehicle.year}</span>
          </div>
          <div className={styles.specItem}>
            <Gauge size={14} className={styles.specIcon} />
            <span>{vehicle.mileage}</span>
          </div>
          <div className={styles.specItem}>
            <Fuel size={14} className={styles.specIcon} />
            <span>{vehicle.fuel}</span>
          </div>
          <div className={styles.specItem}>
            <ShieldCheck size={14} className={styles.specIcon} />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <Link to={`/vehicle/${vehicle.id}`} className={styles.detailsLink}>
            <PrimaryButton fullWidth>View Details</PrimaryButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
