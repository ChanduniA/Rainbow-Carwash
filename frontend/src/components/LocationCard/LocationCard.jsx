import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Clock, Phone, Navigation, ShieldCheck, ExternalLink } from 'lucide-react';
import styles from './LocationCard.module.css';

export const branchesData = [
  {
    id: 'b1',
    name: 'Miami Flagship Inspection Center',
    city: 'Miami, FL',
    address: '880 Ocean Drive, Suite 100, Miami, FL 33139',
    phone: '+1 (800) 555-9111',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    mapCoords: '25.7781° N, 80.1313° W',
    features: ['150-Point Dyno Bay', 'EV Fast Charging', 'VIP Executive Lounge']
  },
  {
    id: 'b2',
    name: 'Los Angeles Performance Hub',
    city: 'Los Angeles, CA',
    address: '9021 Sunset Boulevard, West Hollywood, CA 90069',
    phone: '+1 (800) 555-4000',
    hours: 'Mon - Sat: 8:30 AM - 6:30 PM',
    mapCoords: '34.0909° N, 118.3857° W',
    features: ['Supercar Lift Station', 'Ceramic Coating Lab', 'Valet Pick Up']
  },
  {
    id: 'b3',
    name: 'Manhattan Motors Experience Center',
    city: 'New York, NY',
    address: '555 West 57th Street, Manhattan, NY 10019',
    phone: '+1 (800) 555-6600',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    mapCoords: '40.7712° N, 73.9892° W',
    features: ['Climate Controlled Vault', 'Concierge Escrow', 'Same-Day Title']
  },
  {
    id: 'b4',
    name: 'Dallas Luxury Vehicle Hub',
    city: 'Dallas, TX',
    address: '1500 Turtle Creek Blvd, Dallas, TX 75207',
    phone: '+1 (800) 555-6300',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    mapCoords: '32.7935° N, 96.8184° W',
    features: ['Truck & SUV Heavy Bay', 'Laser Alignment', 'Free Shuttle']
  }
];

const LocationCard = ({ selectedBranchId, onSelectBranch }) => {
  const currentBranch = branchesData.find(b => b.id === selectedBranchId) || branchesData[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Building size={20} className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Inspection Location & Branch</h3>
          <p className={styles.subtitle}>Select your nearest certified Rainbow Traders service center.</p>
        </div>
      </div>

      {/* Branch Select Dropdown */}
      <div className={styles.selectWrapper}>
        <label htmlFor="branchSelect" className={styles.label}>Choose Service Center Branch</label>
        <select
          id="branchSelect"
          className={styles.branchSelect}
          value={currentBranch.id}
          onChange={(e) => onSelectBranch(e.target.value)}
        >
          {branchesData.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name} — {branch.city}
            </option>
          ))}
        </select>
      </div>

      {/* Google Map Placeholder Component */}
      <div className={styles.mapContainer}>
        <div className={styles.mapOverlayGrid} />
        <motion.div
          className={styles.mapPinWrapper}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          key={currentBranch.id}
        >
          <div className={styles.pulseRing} />
          <div className={styles.pinBubble}>
            <MapPin size={20} color="#FFFFFF" />
          </div>
        </motion.div>

        <div className={styles.mapGlassCard}>
          <div className={styles.mapBadge}>
            <Navigation size={12} /> Interactive GPS Preview
          </div>
          <span className={styles.coords}>{currentBranch.mapCoords}</span>
        </div>
      </div>

      {/* Location Details Card */}
      <div className={styles.detailsCard}>
        <h4 className={styles.branchName}>{currentBranch.name}</h4>

        <div className={styles.infoRow}>
          <MapPin size={18} className={styles.infoIcon} />
          <div>
            <strong>Address</strong>
            <p>{currentBranch.address}</p>
          </div>
        </div>

        <div className={styles.infoRow}>
          <Clock size={18} className={styles.infoIcon} />
          <div>
            <strong>Service Hours</strong>
            <p>{currentBranch.hours}</p>
          </div>
        </div>

        <div className={styles.infoRow}>
          <Phone size={18} className={styles.infoIcon} />
          <div>
            <strong>Direct Service Desk</strong>
            <p>{currentBranch.phone}</p>
          </div>
        </div>

        <div className={styles.featuresRow}>
          {currentBranch.features.map((feat, idx) => (
            <span key={idx} className={styles.featureBadge}>
              <ShieldCheck size={12} /> {feat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
