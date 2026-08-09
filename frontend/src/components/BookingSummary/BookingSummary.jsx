import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Car, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import styles from './BookingSummary.module.css';

const BookingSummary = ({
  vehicle,
  date,
  time,
  branch,
  duration = "45 - 60 Minutes (150-Point Master Checklist)",
  onConfirm,
  onCancel,
  isSubmitting = false
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
    : 'Select a date';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Inspection Summary</span>
        <h3 className={styles.title}>Confirm Booking Details</h3>
        <p className={styles.subtitle}>Review your appointment parameters before generating your digital reservation pass.</p>
      </div>

      <div className={styles.summaryList}>
        {/* Vehicle */}
        <div className={styles.summaryItem}>
          <div className={styles.iconCircle}>
            <Car size={18} />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Selected Vehicle</span>
            <strong className={styles.itemValue}>{vehicle?.name || 'Porsche 911 GT3 RS'}</strong>
          </div>
        </div>

        {/* Date */}
        <div className={styles.summaryItem}>
          <div className={styles.iconCircle}>
            <Calendar size={18} />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Appointment Date</span>
            <strong className={styles.itemValue}>{formattedDate}</strong>
          </div>
        </div>

        {/* Time */}
        <div className={styles.summaryItem}>
          <div className={styles.iconCircle}>
            <Clock size={18} />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Selected Time Slot</span>
            <strong className={styles.itemValue}>{time || '10:00 AM'}</strong>
          </div>
        </div>

        {/* Branch */}
        <div className={styles.summaryItem}>
          <div className={styles.iconCircle}>
            <MapPin size={18} />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Inspection Branch</span>
            <strong className={styles.itemValue}>{branch?.name || 'Miami Flagship Inspection Center'}</strong>
          </div>
        </div>

        {/* Duration */}
        <div className={styles.summaryItem}>
          <div className={styles.iconCircle}>
            <ShieldCheck size={18} />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Estimated Duration</span>
            <strong className={styles.itemValue}>{duration}</strong>
          </div>
        </div>
      </div>

      <div className={styles.guaranteeBox}>
        <CheckCircle2 size={18} className={styles.checkIcon} />
        <span>No obligation to buy. Free 150-point report copy sent immediately via email upon completion.</span>
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          <X size={18} /> Cancel
        </button>

        <motion.button
          type="button"
          className={styles.confirmBtn}
          onClick={onConfirm}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Confirming Reservation...' : 'Confirm Inspection Booking'}
          <CheckCircle2 size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default BookingSummary;
