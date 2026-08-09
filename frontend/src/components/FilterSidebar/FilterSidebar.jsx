import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ filters, onFilterChange, onResetFilters }) => {
  const handleChange = (field, value) => {
    onFilterChange(field, value);
  };

  return (
    <aside className={styles.filterSidebar}>
      <div className={styles.filterHeader}>
        <div className={styles.titleRow}>
          <SlidersHorizontal size={20} className={styles.icon} />
          <h3 className={styles.title}>Filter Vehicles</h3>
        </div>
        <button onClick={onResetFilters} className={styles.resetBtn}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Brand */}
      <div className={styles.group}>
        <label className={styles.label}>Brand / Make</label>
        <select
          value={filters.brand || 'All'}
          onChange={(e) => handleChange('brand', e.target.value)}
          className={styles.select}
        >
          <option value="All">All Brands</option>
          <option value="Porsche">Porsche</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Tesla">Tesla</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Aston Martin">Aston Martin</option>
          <option value="Range Rover">Range Rover</option>
        </select>
      </div>

      {/* Model */}
      <div className={styles.group}>
        <label className={styles.label}>Model</label>
        <input
          type="text"
          placeholder="e.g. GT3, M4, RS6..."
          value={filters.model || ''}
          onChange={(e) => handleChange('model', e.target.value)}
          className={styles.input}
        />
      </div>

      {/* Body Type */}
      <div className={styles.group}>
        <label className={styles.label}>Body Type</label>
        <select
          value={filters.bodyType || 'All'}
          onChange={(e) => handleChange('bodyType', e.target.value)}
          className={styles.select}
        >
          <option value="All">All Body Types</option>
          <option value="Coupe">Coupe</option>
          <option value="Sedan">Sedan</option>
          <option value="Wagon">Wagon</option>
          <option value="SUV">SUV</option>
          <option value="Convertible">Convertible</option>
        </select>
      </div>

      {/* Year */}
      <div className={styles.group}>
        <label className={styles.label}>Year</label>
        <select
          value={filters.year || 'All'}
          onChange={(e) => handleChange('year', e.target.value)}
          className={styles.select}
        >
          <option value="All">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div className={styles.group}>
        <label className={styles.label}>Fuel Type</label>
        <select
          value={filters.fuel || 'All'}
          onChange={(e) => handleChange('fuel', e.target.value)}
          className={styles.select}
        >
          <option value="All">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
          <option value="Petrol Hybrid">Petrol Hybrid</option>
        </select>
      </div>

      {/* Transmission */}
      <div className={styles.group}>
        <label className={styles.label}>Transmission</label>
        <select
          value={filters.transmission || 'All'}
          onChange={(e) => handleChange('transmission', e.target.value)}
          className={styles.select}
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic / Dual Clutch</option>
          <option value="Fixed">Single-Speed Fixed (EV)</option>
        </select>
      </div>

      {/* Price Range */}
      <div className={styles.group}>
        <label className={styles.label}>Max Price: ${filters.maxPrice ? parseInt(filters.maxPrice).toLocaleString() : '350,000'}</label>
        <input
          type="range"
          min="50000"
          max="350000"
          step="10000"
          value={filters.maxPrice || '350000'}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          className={styles.rangeInput}
        />
      </div>

      {/* Mileage */}
      <div className={styles.group}>
        <label className={styles.label}>Max Mileage</label>
        <select
          value={filters.maxMileage || 'All'}
          onChange={(e) => handleChange('maxMileage', e.target.value)}
          className={styles.select}
        >
          <option value="All">Any Mileage</option>
          <option value="2000">Under 2,000 miles</option>
          <option value="5000">Under 5,000 miles</option>
          <option value="10000">Under 10,000 miles</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
