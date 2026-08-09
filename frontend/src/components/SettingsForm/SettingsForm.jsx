import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, Phone, MapPin, Globe, Save, Upload, CheckCircle2 } from 'lucide-react';
import styles from './SettingsForm.module.css';

const SettingsForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    companyName: 'Rainbow Traders Inc.',
    tagline: 'Smart Car Sales & High-Yield Trading Management',
    email: 'contact@rainbowtraders.com',
    phone: '+1 (800) 555-RAINBOW',
    address: '450 Brickell Avenue, Suite 2200, Miami, FL 33131',
    website: 'https://rainbowtraders.com',
    twitter: '@rainbowtraders',
    instagram: '@rainbowtraders_official',
    linkedin: 'rainbow-traders-global'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Corporate Settings & System Branding</h3>
          <p className={styles.sub}>Manage dealership info, headquarters address, and public profile.</p>
        </div>
        <button type="submit" className={styles.saveBtn}>
          <Save size={16} /> Save Configuration
        </button>
      </div>

      <div className={styles.logoSection}>
        <div className={styles.logoPreview}>
          <span>RT</span>
        </div>
        <div className={styles.logoUploadMeta}>
          <strong className={styles.logoTitle}>Dealership Brand Logo</strong>
          <span className={styles.logoDesc}>SVG, PNG or JPG (Max 800x800px). Transparent background recommended.</span>
          <button type="button" className={styles.uploadBtn}>
            <Upload size={14} /> Upload New Logo
          </button>
        </div>
      </div>

      <div className={styles.gridFields}>
        {/* Company Name */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <Building size={15} /> Dealership / Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Tagline */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Tagline & Subtitle</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Support Email */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <Mail size={15} /> Support & Inquiry Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Phone */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <Phone size={15} /> Official Telephone Line
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Headquarters Address */}
        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            <MapPin size={15} /> Headquarters Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Social Media Links */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <Globe size={15} /> Official Website URL
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Twitter / X Handle</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.footerRow}>
        <button type="submit" className={styles.saveBtn}>
          <Save size={16} /> Save Configuration
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
