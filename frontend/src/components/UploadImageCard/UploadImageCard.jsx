import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Camera, Plus } from 'lucide-react';
import styles from './UploadImageCard.module.css';

const presetSlots = [
  { id: 'front', label: 'Front View', icon: Camera },
  { id: 'rear', label: 'Rear View', icon: Camera },
  { id: 'left', label: 'Left Side', icon: Camera },
  { id: 'right', label: 'Right Side', icon: Camera },
  { id: 'interior', label: 'Interior', icon: Camera },
  { id: 'dashboard', label: 'Dashboard', icon: Camera },
  { id: 'engine', label: 'Engine', icon: Camera },
  { id: 'additional', label: 'Additional Photos', icon: Plus },
];

const UploadImageCard = ({ onImagesUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (filesList) => {
    const newFiles = Array.from(filesList).map((file, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      name: file.name,
      url: URL.createObjectURL(file),
      tag: 'Vehicle Photo'
    }));

    if (onImagesUpload) {
      onImagesUpload(newFiles);
    }
  };

  const handleSlotClick = (slotLabel) => {
    // Open file chooser and set tag
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconBadge}>
          <ImageIcon size={22} />
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Upload High-Resolution Vehicle Images</h3>
          <p className={styles.sectionSubtitle}>Clear photos of key angles increase valuation precision and expedite trade offer confirmation.</p>
        </div>
      </div>

      {/* Large Drag and Drop Dropzone */}
      <motion.div
        className={styles.dropZone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        whileHover={{ borderColor: 'var(--color-primary)', scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          className={styles.hiddenInput}
        />
        <div className={styles.dropContent}>
          <div className={styles.cloudIconWrapper}>
            <UploadCloud size={40} className={styles.cloudIcon} />
          </div>
          <h4 className={styles.dropTitle}>Drag & Drop vehicle photos here</h4>
          <p className={styles.dropSubtitle}>Supports JPG, PNG, WEBP up to 20MB per photo</p>
          <button type="button" className={styles.browseButton}>
            Browse Files from Device
          </button>
        </div>
      </motion.div>

      {/* Recommended Photo View Badges / Preset Slot Quick Actions */}
      <div className={styles.presetSection}>
        <span className={styles.presetHeading}>Recommended Photo View Angles:</span>
        <div className={styles.presetGrid}>
          {presetSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <motion.button
                key={slot.id}
                type="button"
                className={styles.presetCard}
                onClick={() => handleSlotClick(slot.label)}
                whileHover={{ y: -3, borderColor: 'var(--color-primary)' }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={16} />
                <span>{slot.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadImageCard;
