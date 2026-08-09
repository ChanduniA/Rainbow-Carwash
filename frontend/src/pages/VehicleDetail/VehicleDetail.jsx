import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Gauge,
  Fuel,
  ShieldCheck,
  MapPin,
  CheckCircle,
  Car,
  Bot,
  Heart,
  Share2,
  DollarSign,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Wrench,
  TrendingUp,
  Share
} from 'lucide-react';
import Container from '../../components/Container/Container';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Gallery from '../../components/Gallery/Gallery';
import SpecificationTable from '../../components/SpecificationTable/SpecificationTable';
import SellerCard from '../../components/SellerCard/SellerCard';
import LoanCalculator from '../../components/LoanCalculator/LoanCalculator';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import { vehiclesData } from '../../data/vehicles';
import styles from './VehicleDetail.module.css';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehiclesData.find((v) => v.id === id) || vehiclesData[0];
  const relatedVehicles = vehiclesData.filter((v) => v.id !== vehicle.id).slice(0, 3);

  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('inspection'); // 'inspection' | 'seller'
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormSubmitted(false);
    setIsModalOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setIsModalOpen(false), 1800);
  };

  return (
    <div className={styles.detailPage}>
      <Container className={styles.container}>
        <Breadcrumb
          items={[
            { label: 'Inventory', link: '/inventory' },
            { label: vehicle.name }
          ]}
        />

        {/* Title & Quick Actions Row */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.brandRow}>
              <span className={styles.brandBadge}>{vehicle.brand}</span>
              <span className={styles.verifiedBadge}>Verified Inventory</span>
            </div>
            <h1 className={styles.title}>{vehicle.name}</h1>
            <p className={styles.location}>
              <MapPin size={16} /> {vehicle.location} • Available for Delivery
            </p>
          </div>

          <div className={styles.priceActionWrapper}>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Price</span>
              <div className={styles.priceValue}>${vehicle.price.toLocaleString()}</div>
            </div>

            <div className={styles.shareSaveGroup}>
              <button
                className={`${styles.iconBtn} ${isSaved ? styles.activeSaved : ''}`}
                onClick={() => setIsSaved(!isSaved)}
                title={isSaved ? "Saved to favorites" : "Save vehicle"}
                aria-label="Save vehicle"
              >
                <Heart size={18} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#475569'} />
              </button>
              <button
                className={styles.iconBtn}
                onClick={handleShare}
                title="Share vehicle link"
                aria-label="Share vehicle"
              >
                <Share2 size={18} color="#475569" />
              </button>
              {isCopied && <span className={styles.copiedToast}>Link Copied!</span>}
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className={styles.gridMain}>
          {/* Left Column: Gallery, Specs, Description, Features, Reviews */}
          <div className={styles.leftCol}>
            {/* Gallery Component */}
            <Gallery images={vehicle.images} alt={vehicle.name} />

            {/* Specification Table Component */}
            <Card className={styles.sectionCard}>
              <SpecificationTable vehicle={vehicle} />
            </Card>

            {/* Description */}
            <Card className={styles.sectionCard}>
              <h3 className={styles.sectionHeading}>Vehicle Description</h3>
              <p className={styles.descriptionText}>{vehicle.description}</p>
            </Card>

            {/* Highlights / Features */}
            <Card className={styles.sectionCard}>
              <h3 className={styles.sectionHeading}>Key Features & Highlights</h3>
              <ul className={styles.highlightsGrid}>
                {vehicle.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Customer Reviews Component */}
            <Card className={styles.sectionCard}>
              <h3 className={styles.sectionHeading}>Customer Reviews & Ratings</h3>
              <div className={styles.reviewsList}>
                {vehicle.reviews && vehicle.reviews.length > 0 ? (
                  vehicle.reviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
                ) : (
                  <ReviewCard />
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Sticky Action Box, Seller Card, Loan Calculator */}
          <div className={styles.rightCol}>
            {/* Action Box */}
            <Card className={styles.actionCard}>
              <h3 className={styles.actionTitle}>Interested in this Vehicle?</h3>
              <p className={styles.actionSub}>Reserve online with full escrow buyer protection or schedule a certified inspection.</p>

              <div className={styles.actionButtonsList}>
                <PrimaryButton fullWidth icon={Wrench} onClick={() => handleOpenModal('inspection')}>
                  Book Inspection
                </PrimaryButton>

                <Link to="/trade-in" className={styles.btnLink}>
                  <SecondaryButton fullWidth variant="outline" icon={TrendingUp}>
                    Trade In Your Car
                  </SecondaryButton>
                </Link>

                <SecondaryButton fullWidth variant="dark" icon={MessageSquare} onClick={() => handleOpenModal('seller')}>
                  Contact Seller
                </SecondaryButton>
              </div>

              <div className={styles.guaranteeBox}>
                <ShieldCheck size={24} className={styles.shieldIcon} />
                <div>
                  <strong>Rainbow Certified Guarantee</strong>
                  <p>Includes 12-month powertrain warranty & 7-day money back guarantee.</p>
                </div>
              </div>
            </Card>

            {/* Seller Information Card Component */}
            <SellerCard seller={vehicle.seller} onContactSeller={() => handleOpenModal('seller')} />

            {/* Loan Calculator Component */}
            <LoanCalculator defaultPrice={vehicle.price} />
          </div>
        </div>

        {/* Related Vehicles Section */}
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h3>Similar Luxury Vehicles</h3>
            <Link to="/inventory" className={styles.viewAllLink}>
              View All Inventory <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.relatedGrid}>
            {relatedVehicles.map((relCar) => (
              <VehicleCard key={relCar.id} vehicle={relCar} />
            ))}
          </div>
        </section>
      </Container>

      {/* Modal for Inspection / Contact Seller */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'inspection' ? `Book Inspection: ${vehicle.name}` : `Contact Seller: ${vehicle.seller?.name || 'Rainbow Dealer'}`}
      >
        {formSubmitted ? (
          <div className={styles.modalSuccess}>
            <CheckCircle size={48} color="#22C55E" />
            <h3>Request Submitted!</h3>
            <p>Our advisor will reach out to you within 15 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className={styles.modalForm}>
            <div className={styles.field}>
              <label>Your Full Name</label>
              <input type="text" required placeholder="Alexander Wright" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" required placeholder="alexander@example.com" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              <input type="tel" required placeholder="+1 (555) 234-5678" className={styles.input} />
            </div>
            {modalType === 'inspection' ? (
              <div className={styles.field}>
                <label>Preferred Date</label>
                <input type="date" required className={styles.input} />
              </div>
            ) : (
              <div className={styles.field}>
                <label>Message</label>
                <textarea rows={3} placeholder="I would like to inquire about this vehicle..." className={styles.input} />
              </div>
            )}
            <PrimaryButton type="submit" fullWidth>
              {modalType === 'inspection' ? 'Confirm Inspection Booking' : 'Send Message'}
            </PrimaryButton>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default VehicleDetail;
