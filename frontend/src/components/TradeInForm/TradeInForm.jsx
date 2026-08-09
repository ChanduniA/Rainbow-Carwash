import React from 'react';
import { Car, Hash, DollarSign, Gauge, Shield, Palette, FileText } from 'lucide-react';
import styles from './TradeInForm.module.css';

const TradeInForm = ({ formData, onChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconBadge}>
          <Car size={22} />
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Vehicle Specification & Details</h3>
          <p className={styles.sectionSubtitle}>Provide full details to maximize your automated vehicle valuation score.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.fieldGroup}>
          <label htmlFor="brand" className={styles.label}>Brand / Make *</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand || 'BMW'}
            onChange={onChange}
            className={styles.selectInput}
            required
          >
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Porsche">Porsche</option>
            <option value="Audi">Audi</option>
            <option value="Tesla">Tesla</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Range Rover">Range Rover</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
          </select>
        </div>

        {/* Model */}
        <div className={styles.fieldGroup}>
          <label htmlFor="model" className={styles.label}>Model & Trim *</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model || ''}
            onChange={onChange}
            placeholder="e.g. M3 Competition / Model S Plaid"
            className={styles.textInput}
            required
          />
        </div>

        {/* Year */}
        <div className={styles.fieldGroup}>
          <label htmlFor="year" className={styles.label}>Model Year *</label>
          <select
            id="year"
            name="year"
            value={formData.year || '2022'}
            onChange={onChange}
            className={styles.selectInput}
            required
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016 & Older</option>
          </select>
        </div>

        {/* Body Type */}
        <div className={styles.fieldGroup}>
          <label htmlFor="bodyType" className={styles.label}>Body Type *</label>
          <select
            id="bodyType"
            name="bodyType"
            value={formData.bodyType || 'Coupe'}
            onChange={onChange}
            className={styles.selectInput}
            required
          >
            <option value="Coupe">Coupe</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Wagon">Wagon</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {/* Transmission */}
        <div className={styles.fieldGroup}>
          <label htmlFor="transmission" className={styles.label}>Transmission *</label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission || 'Automatic'}
            onChange={onChange}
            className={styles.selectInput}
            required
          >
            <option value="Automatic">Automatic / Dual-Clutch</option>
            <option value="Manual">Manual (6-Speed)</option>
            <option value="Single-Speed">Single-Speed (Electric)</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className={styles.fieldGroup}>
          <label htmlFor="fuelType" className={styles.label}>Fuel Type *</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType || 'Petrol'}
            onChange={onChange}
            className={styles.selectInput}
            required
          >
            <option value="Petrol">Petrol / Premium Unleaded</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid / Plug-in Hybrid</option>
            <option value="Electric">Electric (BEV)</option>
          </select>
        </div>

        {/* Engine */}
        <div className={styles.fieldGroup}>
          <label htmlFor="engine" className={styles.label}>Engine Capacity / Specs</label>
          <input
            type="text"
            id="engine"
            name="engine"
            value={formData.engine || ''}
            onChange={onChange}
            placeholder="e.g. 3.0L Twin-Turbo I6 / Dual Motor"
            className={styles.textInput}
          />
        </div>

        {/* Mileage */}
        <div className={styles.fieldGroup}>
          <label htmlFor="mileage" className={styles.label}>Current Mileage (miles) *</label>
          <div className={styles.inputIconWrapper}>
            <Gauge className={styles.fieldIcon} size={18} />
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage || ''}
              onChange={onChange}
              placeholder="e.g. 18500"
              className={styles.textInputWithIcon}
              required
            />
          </div>
        </div>

        {/* Exterior Color */}
        <div className={styles.fieldGroup}>
          <label htmlFor="exteriorColor" className={styles.label}>Exterior Color</label>
          <div className={styles.inputIconWrapper}>
            <Palette className={styles.fieldIcon} size={18} />
            <input
              type="text"
              id="exteriorColor"
              name="exteriorColor"
              value={formData.exteriorColor || ''}
              onChange={onChange}
              placeholder="e.g. Isle of Man Green Metallic"
              className={styles.textInputWithIcon}
            />
          </div>
        </div>

        {/* Interior Color */}
        <div className={styles.fieldGroup}>
          <label htmlFor="interiorColor" className={styles.label}>Interior Color & Material</label>
          <input
            type="text"
            id="interiorColor"
            name="interiorColor"
            value={formData.interiorColor || ''}
            onChange={onChange}
            placeholder="e.g. Black Marino Leather"
            className={styles.textInput}
          />
        </div>

        {/* VIN Number */}
        <div className={styles.fieldGroup}>
          <label htmlFor="vinNumber" className={styles.label}>VIN Number (17 Characters)</label>
          <div className={styles.inputIconWrapper}>
            <Hash className={styles.fieldIcon} size={18} />
            <input
              type="text"
              id="vinNumber"
              name="vinNumber"
              value={formData.vinNumber || ''}
              onChange={onChange}
              placeholder="17-Digit Vehicle Identification Number"
              className={styles.textInputWithIcon}
              maxLength={17}
            />
          </div>
        </div>

        {/* Registration Number */}
        <div className={styles.fieldGroup}>
          <label htmlFor="registrationNumber" className={styles.label}>Registration / License Plate</label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber || ''}
            onChange={onChange}
            placeholder="e.g. 7XYZ98"
            className={styles.textInput}
          />
        </div>

        {/* Expected Selling Price */}
        <div className={styles.fieldGroup}>
          <label htmlFor="expectedPrice" className={styles.label}>Expected Selling Price ($)</label>
          <div className={styles.inputIconWrapper}>
            <DollarSign className={styles.fieldIcon} size={18} />
            <input
              type="number"
              id="expectedPrice"
              name="expectedPrice"
              value={formData.expectedPrice || ''}
              onChange={onChange}
              placeholder="e.g. 65000"
              className={styles.textInputWithIcon}
            />
          </div>
        </div>

        {/* Condition Dropdown */}
        <div className={styles.fieldGroup}>
          <label htmlFor="condition" className={styles.label}>Overall Vehicle Condition *</label>
          <div className={styles.inputIconWrapper}>
            <Shield className={styles.fieldIcon} size={18} />
            <select
              id="condition"
              name="condition"
              value={formData.condition || 'Excellent'}
              onChange={onChange}
              className={styles.selectInputWithIcon}
              required
            >
              <option value="Excellent">Excellent (Like-new, zero scratches or mechanical faults)</option>
              <option value="Very Good">Very Good (Minor wear, fully maintained)</option>
              <option value="Good">Good (Normal cosmetic blemishes, strong engine)</option>
              <option value="Fair">Fair (Needs minor repairs or tires soon)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Large Description Text Area */}
      <div className={styles.fullWidthField}>
        <label htmlFor="description" className={styles.label}>
          <FileText size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Vehicle History & Additional Notes
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description || ''}
          onChange={onChange}
          placeholder="Describe upgrades, maintenance history, tire condition, warranty status, or any accidents..."
          className={styles.textareaInput}
        />
      </div>

      <div className={styles.actionRow}>
        <button type="submit" className={styles.nextButton}>
          Continue to Vehicle Images &rarr;
        </button>
      </div>
    </form>
  );
};

export default TradeInForm;
