import React from 'react';
import { motion } from 'framer-motion';
import { Check, Car, Image, User, FileCheck } from 'lucide-react';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TradeInStepper.module.css';

const stepsList = [
  { id: 1, title: 'Vehicle Information', subtitle: 'Specs & condition', icon: Car },
  { id: 2, title: 'Vehicle Images', subtitle: 'Photos & angles', icon: Image },
  { id: 3, title: 'Personal Details', subtitle: 'Owner contact', icon: User },
  { id: 4, title: 'Review & Submit', subtitle: 'Final appraisal', icon: FileCheck },
];

const TradeInStepper = ({ currentStep = 1, onStepClick }) => {
  const progressPercentage = ((currentStep - 1) / (stepsList.length - 1)) * 100;

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.progressHeader}>
        <span className={styles.progressTitle}>Step {currentStep} of {stepsList.length}</span>
        <span className={styles.stepName}>{stepsList[currentStep - 1]?.title}</span>
      </div>

      <div className={styles.barWrapper}>
        <ProgressBar progress={progressPercentage} height={6} />
      </div>

      <div className={styles.stepsGrid}>
        {stepsList.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <motion.button
              key={step.id}
              type="button"
              className={`${styles.stepCard} ${isActive ? styles.activeCard : ''} ${isCompleted ? styles.completedCard : ''}`}
              onClick={() => onStepClick && onStepClick(step.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconCircle}>
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <div className={styles.stepMeta}>
                <span className={styles.stepLabel}>Step {step.id}</span>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TradeInStepper;
