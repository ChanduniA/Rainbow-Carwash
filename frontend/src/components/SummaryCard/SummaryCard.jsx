import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, Camera, Save, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ formData = {}, imageCount = 0, onSaveDraft, onSubmit, isSubmitting = false }) => {
  // Calculate dynamic valuation preview
  const baseValue = formData.expectedPrice ? parseInt(formData.expectedPrice) : 48500;
  const conditionBonus = formData.condition === 'Excellent' ? 1.08 : formData.condition === 'Very Good' ? 1.02 : 0.94;
  const imageBonus = imageCount >= 4 ? 1200 : imageCount >= 1 ? 500 : 0;
  
  const estimatedValue = Math.round(baseValue * conditionBonus + imageBonus);
  const instantCreditValue = Math.round(estimatedValue * 0.95);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Live Valuation Summary</span>
        <h3 className={styles.vehicleTitle}>
          {formData.year || '2024'} {formData.brand || 'BMW'} {formData.model || 'Vehicle'}
        </h3>
        <p className={styles.vehicleSubtitle}>{formData.bodyType || 'Coupe'} &bull; {formData.transmission || 'Automatic'} &bull; {formData.fuelType || 'Petrol'}</p>
      </div>

      <div className={styles.valueBox}>
        <div className={styles.valueLabel}>Estimated Trade-In Market Payout</div>
        <div className={styles.amountGroup}>
          <DollarSign className={styles.currencyIcon} size={28} />
          <span className={styles.amount}>{estimatedValue.toLocaleString()}</span>
        </div>
        <div className={styles.subValue}>
          Instant Escrow Transfer: <strong>${instantCreditValue.toLocaleString()}</strong>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Condition Grade</span>
          <span className={styles.statVal}>{formData.condition || 'Excellent'}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Current Mileage</span>
          <span className={styles.statVal}>{formData.mileage ? `${parseInt(formData.mileage).toLocaleString()} mi` : '18,500 mi'}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Photos Uploaded</span>
          <span className={styles.statVal}>
            <Camera size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {imageCount} Photos
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>VIN Status</span>
          <span className={styles.statValSuccess}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {formData.vinNumber ? 'Verified' : 'Pending'}
          </span>
        </div>
      </div>

      <div className={styles.guaranteeNotice}>
        <CheckCircle2 size={18} className={styles.checkIcon} />
        <span>Valuation includes Rainbow Traders 7-Day Price Lock Guarantee & Complimentary Home Transport Pickup.</span>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionsGroup}>
        <motion.button
          type="button"
          className={styles.saveDraftBtn}
          onClick={onSaveDraft}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={18} />
          Save Draft
        </motion.button>

        <motion.button
          type="button"
          className={styles.submitBtn}
          onClick={onSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Processing Appraisal...' : 'Submit Trade-In Request'}
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default SummaryCard;
