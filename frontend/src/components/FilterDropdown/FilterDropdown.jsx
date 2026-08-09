import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import styles from './FilterDropdown.module.css';

const FilterDropdown = ({ options = [], value, onChange, label = "Filter By" }) => {
  return (
    <div className={styles.container}>
      <Filter size={16} className={styles.icon} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">{label} (All)</option>
        {options.map((opt, idx) => (
          <option key={idx} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className={styles.arrow} />
    </div>
  );
};

export default FilterDropdown;
