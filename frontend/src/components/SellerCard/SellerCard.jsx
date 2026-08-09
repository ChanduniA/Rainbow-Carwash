import React from 'react';
import { ShieldCheck, Star, Phone, Mail, MapPin } from 'lucide-react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import styles from './SellerCard.module.css';

const SellerCard = ({ seller, onContactSeller }) => {
  const sellerInfo = seller || {
    name: "Rainbow Certified Dealership",
    rating: 4.9,
    phone: "+1 (800) 555-7000",
    email: "sales@rainbowtraders.com",
    verified: true
  };

  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerHeader}>
        <div className={styles.avatar}>
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className={styles.sellerName}>{sellerInfo.name}</h4>
          <div className={styles.ratingRow}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <strong className={styles.ratingScore}>{sellerInfo.rating}</strong>
            <span className={styles.verifiedTag}>Verified Seller</span>
          </div>
        </div>
      </div>

      <div className={styles.sellerContacts}>
        <div className={styles.contactItem}>
          <Phone size={16} className={styles.contactIcon} />
          <span>{sellerInfo.phone}</span>
        </div>
        <div className={styles.contactItem}>
          <Mail size={16} className={styles.contactIcon} />
          <span>{sellerInfo.email}</span>
        </div>
      </div>

      <PrimaryButton fullWidth icon={Mail} onClick={onContactSeller}>
        Contact Seller Directly
      </PrimaryButton>
    </div>
  );
};

export default SellerCard;
