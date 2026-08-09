import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit3, ShieldCheck, Award } from 'lucide-react';
import styles from './ProfileCard.module.css';

const ProfileCard = ({
  user = {
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 987-6543',
    address: '450 Brickell Avenue, Suite 2200, Miami, FL 33131',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    memberSince: 'March 2024',
    tier: 'Platinum VIP Collector'
  },
  onEdit
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <img src={user.avatar} alt={user.name} className={styles.avatar} />
          <span className={styles.verifiedBadge} title="Verified Account">
            <ShieldCheck size={16} color="#FFFFFF" />
          </span>
        </div>

        <div className={styles.identityMeta}>
          <h3 className={styles.userName}>{user.name}</h3>
          <div className={styles.tierTag}>
            <Award size={14} /> {user.tier}
          </div>
        </div>

        <button type="button" className={styles.editBtn} onClick={onEdit}>
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <div className={styles.detailsList}>
        <div className={styles.detailRow}>
          <div className={styles.iconCircle}>
            <Mail size={16} />
          </div>
          <div className={styles.detailMeta}>
            <span className={styles.label}>Email Address</span>
            <strong className={styles.val}>{user.email}</strong>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.iconCircle}>
            <Phone size={16} />
          </div>
          <div className={styles.detailMeta}>
            <span className={styles.label}>Phone Number</span>
            <strong className={styles.val}>{user.phone}</strong>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.iconCircle}>
            <MapPin size={16} />
          </div>
          <div className={styles.detailMeta}>
            <span className={styles.label}>Physical Address</span>
            <strong className={styles.val}>{user.address}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
