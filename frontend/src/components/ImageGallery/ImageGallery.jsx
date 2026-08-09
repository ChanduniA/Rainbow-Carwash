import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images = [], onRemoveImage, onSelectPreview }) => {
  if (!images || images.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <AlertCircle size={28} className={styles.emptyIcon} />
        <p className={styles.emptyText}>No vehicle images uploaded yet. Upload at least 3 photos for optimal appraisal accuracy.</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h4 className={styles.galleryTitle}>
          Uploaded Photos ({images.length})
        </h4>
        <span className={styles.qualityBadge}>
          <CheckCircle2 size={16} /> Quality Check Ready
        </span>
      </div>

      <div className={styles.grid}>
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              className={styles.imageCard}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.imageWrapper}>
                <img src={img.url} alt={img.name || 'Vehicle photo'} className={styles.img} />
                <div className={styles.overlay}>
                  {onSelectPreview && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => onSelectPreview(img)}
                      title="View Large"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                  {onRemoveImage && (
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onRemoveImage(img.id)}
                      title="Remove Image"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.fileName}>{img.name || 'Photo'}</span>
                {img.tag && <span className={styles.tag}>{img.tag}</span>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGallery;
