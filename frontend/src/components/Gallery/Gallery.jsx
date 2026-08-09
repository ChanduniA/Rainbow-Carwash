import React, { useState } from 'react';
import styles from './Gallery.module.css';

const Gallery = ({ images = [], alt = "Vehicle Image" }) => {
  const imageList = images && images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80"
  ];
  
  const [activeImage, setActiveImage] = useState(imageList[0]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageFrame}>
        <img src={activeImage} alt={alt} className={styles.mainImg} />
      </div>

      {imageList.length > 1 && (
        <div className={styles.thumbnailRow}>
          {imageList.map((img, idx) => (
            <button
              key={idx}
              className={`${styles.thumbBtn} ${activeImage === img ? styles.activeThumb : ''}`}
              onClick={() => setActiveImage(img)}
            >
              <img src={img} alt={`${alt} view ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
