import React from 'react';
import { Calendar, Gauge, Fuel, ShieldCheck, Zap, MapPin, Layers, Award } from 'lucide-react';
import styles from './SpecificationTable.module.css';

const SpecificationTable = ({ vehicle }) => {
  const specs = [
    { label: 'Year', value: vehicle.year, icon: Calendar },
    { label: 'Mileage', value: vehicle.mileage, icon: Gauge },
    { label: 'Fuel Type', value: vehicle.fuel, icon: Fuel },
    { label: 'Transmission', value: vehicle.transmission, icon: ShieldCheck },
    { label: 'Engine', value: vehicle.engine || 'N/A', icon: Zap },
    { label: 'Horsepower', value: vehicle.horsepower || 'N/A', icon: Award },
    { label: 'Body Type', value: vehicle.bodyType || 'Coupe', icon: Layers },
    { label: 'Location', value: vehicle.location, icon: MapPin },
  ];

  return (
    <div className={styles.specTableContainer}>
      <h3 className={styles.tableTitle}>Vehicle Specifications</h3>
      <div className={styles.specGrid}>
        {specs.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className={styles.specItem}>
              <div className={styles.iconWrapper}>
                <IconComp size={18} />
              </div>
              <div className={styles.metaInfo}>
                <span className={styles.label}>{item.label}</span>
                <strong className={styles.value}>{item.value}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecificationTable;
