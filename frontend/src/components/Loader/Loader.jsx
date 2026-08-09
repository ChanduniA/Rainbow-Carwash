import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ fullPage = false, text = 'Loading Rainbow Traders...' }) => {
  return (
    <div className={`${styles.loaderContainer} ${fullPage ? styles.fullPage : ''}`}>
      <div className={styles.spinner}>
        <div className={styles.innerRing}></div>
      </div>
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  );
};

export default Loader;
