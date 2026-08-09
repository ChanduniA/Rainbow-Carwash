import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || 'var(--radius-sm)'
  };

  return <div className={`${styles.skeleton} ${className}`} style={style} />;
};

export default Skeleton;
