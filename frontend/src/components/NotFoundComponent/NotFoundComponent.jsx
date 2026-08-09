import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import styles from './NotFoundComponent.module.css';

const NotFoundComponent = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.badge404}>404 ERROR</div>
        <div className={styles.iconCircle}>
          <Compass size={48} className={styles.compassIcon} />
        </div>

        <h1 className={styles.title}>Roadblock Encountered</h1>
        <p className={styles.subtitle}>
          The page or vehicle record you are looking for has been moved, renamed, or no longer exists in our live database.
        </p>

        <div className={styles.actions}>
          <a href="/" className={styles.homeBtn}>
            <Home size={18} /> Return to Homepage
          </a>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundComponent;
