import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Upload,
  User,
  CheckCircle2,
  Save,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import TradeInStepper from '../../components/TradeInStepper/TradeInStepper';
import TradeInForm from '../../components/TradeInForm/TradeInForm';
import UploadImageCard from '../../components/UploadImageCard/UploadImageCard';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import TipsCard from '../../components/TipsCard/TipsCard';
import FAQCard from '../../components/FAQCard/FAQCard';
import styles from './TradeIn.module.css';

const tradeInFaqs = [
  {
    question: "How does the Rainbow Traders online valuation work?",
    answer: "Our automated valuation model checks recent sales data, regional scarcity, mileage, and vehicle condition to compute a firm, guaranteed 7-day trade offer."
  },
  {
    question: "Can I apply my trade-in value toward a lease or purchase?",
    answer: "Yes! 100% of your vehicle's trade value can be applied directly as a down payment toward any vehicle in our flagship inventory or custom order."
  },
  {
    question: "What if I still owe money on my vehicle loan?",
    answer: "We handle loan payoff directly with your lender. If your car is worth more than you owe, the remaining equity goes toward your new purchase!"
  },
  {
    question: "Do you offer complimentary vehicle pickup?",
    answer: "Yes, once your trade-in request is submitted and confirmed, our white-glove transport team can pick up your car directly from your home or office."
  }
];

const TradeIn = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [referenceId, setReferenceId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    brand: 'BMW',
    model: 'M3 Competition',
    year: '2023',
    bodyType: 'Coupe',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.0L Twin-Turbo I6',
    mileage: '18500',
    exteriorColor: 'Isle of Man Green',
    interiorColor: 'Black Marino Leather',
    vinNumber: 'WBS33AY090FP12345',
    registrationNumber: '7XYZ98',
    expectedPrice: '68500',
    condition: 'Excellent',
    description: 'Immaculate single-owner vehicle, always garage kept and serviced exclusively at certified BMW dealerships. Includes M Drivers package and full PPF front wrap.',

    // Owner Info
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    city: '',
    address: '',
    preferredContact: 'Phone'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFormData(prev => ({
          ...prev,
          fullName: parsedUser.name || '',
          emailAddress: parsedUser.email || '',
          phoneNumber: parsedUser.phone || ''
        }));
      } catch (err) {
        console.error('Failed to parse user data from local storage:', err);
      }
    }
  }, []);

  // Images State
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesUpload = (newFiles) => {
    setImages((prev) => [...prev, ...newFiles]);
    showToast(`${newFiles.length} photo(s) added successfully!`);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    showToast('Photo removed.');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDraft = () => {
    showToast('Progress saved to local draft!');
  };

  const handleSubmitTradeIn = async () => {
    setIsSubmitting(true);
    try {
      const storedUser = localStorage.getItem('user');
      // In the auth login/register payload we just stored user as {name, email, phone, role} 
      // but maybe we have userId if we fetched it, or we fallback to email or guest.
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser ? (parsedUser.email || 'guest') : 'guest';

      const response = await fetch('/api/trade-in/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, images, userId })
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Error submitting request');
        setIsSubmitting(false);
        return;
      }

      setReferenceId(data.referenceId || `#TRD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`);
      setSubmittedSuccess(true);
    } catch (err) {
      showToast('Error connecting to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.tradeInPage}>
      <PageHeader
        title="Trade-In Your Vehicle"
        subtitle="Get the best value for your current vehicle."
        breadcrumbs={[{ label: 'Trade-In Request' }]}
      />

      <Container className={styles.containerPadding}>
        {/* Animated Progress Indicator / Stepper */}
        <TradeInStepper
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className={styles.toast}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckCircle2 size={18} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {submittedSuccess ? (
          <motion.div
            className={styles.successStateCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.successIconBadge}>
              <CheckCircle2 size={48} color="#22C55E" />
            </div>
            <h2 className={styles.successTitle}>Trade-In Request Submitted!</h2>
            <p className={styles.successSubtitle}>
              Thank you, <strong>{formData.fullName}</strong>. Your vehicle appraisal request for the{' '}
              <strong>{formData.year} {formData.brand} {formData.model}</strong> has been received by our valuation desk.
            </p>

            <div className={styles.successDetailsGrid}>
              <div className={styles.successDetailBox}>
                <span className={styles.successDetailLabel}>Reference Number</span>
                <strong className={styles.successDetailValue}>#{referenceId}</strong>
              </div>
              <div className={styles.successDetailBox}>
                <span className={styles.successDetailLabel}>Estimated Payout</span>
                <strong className={styles.successDetailValueText}>${(parseInt(formData.expectedPrice || 68500) * 1.05).toLocaleString()}</strong>
              </div>
              <div className={styles.successDetailBox}>
                <span className={styles.successDetailLabel}>Contact Method</span>
                <strong className={styles.successDetailValue}>{formData.preferredContact} ({formData.phoneNumber})</strong>
              </div>
            </div>

            <div className={styles.successActions}>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setSubmittedSuccess(false);
                  setCurrentStep(1);
                }}
              >
                Submit Another Trade-In
              </button>
            </div>
          </motion.div>
        ) : (
          <div className={styles.mainLayoutGrid}>
            {/* Left Content Area (Steps 1 to 4) */}
            <div className={styles.leftCol}>
              {/* STEP 1: Vehicle Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <TradeInForm
                    formData={formData}
                    onChange={handleChange}
                    onNext={() => setCurrentStep(2)}
                  />
                </motion.div>
              )}

              {/* STEP 2: Vehicle Images */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className={styles.stepBlock}
                >
                  <UploadImageCard onImagesUpload={handleImagesUpload} />

                  <ImageGallery
                    images={images}
                    onRemoveImage={handleRemoveImage}
                  />

                  <div className={styles.stepNavRow}>
                    <button
                      type="button"
                      className={styles.backBtn}
                      onClick={() => setCurrentStep(1)}
                    >
                      <ArrowLeft size={18} /> Back to Vehicle Info
                    </button>
                    <button
                      type="button"
                      className={styles.nextBtn}
                      onClick={() => setCurrentStep(3)}
                    >
                      Continue to Owner Details &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Owner Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className={styles.stepBlock}
                >
                  <div className={styles.ownerCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconBadge}>
                        <User size={22} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>Owner Information</h3>
                        <p className={styles.cardSubtitle}>Provide your contact details so our valuation advisor can reach you.</p>
                      </div>
                    </div>

                    <div className={styles.ownerGrid}>
                      {/* Full Name */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="fullName" className={styles.label}>Full Name *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Alexander Vance"
                          className={styles.textInput}
                          required
                        />
                      </div>

                      {/* Phone Number */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>Phone Number *</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="e.g. +1 (555) 234-5678"
                          className={styles.textInput}
                          required
                        />
                      </div>

                      {/* Email Address */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="emailAddress" className={styles.label}>Email Address *</label>
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="e.g. alex@example.com"
                          className={styles.textInput}
                          required
                        />
                      </div>

                      {/* City */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="city" className={styles.label}>City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Miami"
                          className={styles.textInput}
                          required
                        />
                      </div>

                      {/* Address */}
                      <div className={`${styles.fieldGroup} ${styles.fullRow}`}>
                        <label htmlFor="address" className={styles.label}>Physical Address (For Transport Pickup)</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="e.g. 450 Brickell Avenue, Suite 2200"
                          className={styles.textInput}
                        />
                      </div>

                      {/* Preferred Contact Method */}
                      <div className={`${styles.fieldGroup} ${styles.fullRow}`}>
                        <label className={styles.label}>Preferred Contact Method *</label>
                        <div className={styles.radioGrid}>
                          {[
                            { id: 'Phone', label: 'Phone Call', icon: Phone },
                            { id: 'Email', label: 'Email', icon: Mail },
                            { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare }
                          ].map((method) => {
                            const Icon = method.icon;
                            const isSelected = formData.preferredContact === method.id;

                            return (
                              <button
                                key={method.id}
                                type="button"
                                className={`${styles.radioOption} ${isSelected ? styles.radioSelected : ''}`}
                                onClick={() => setFormData({ ...formData, preferredContact: method.id })}
                              >
                                <Icon size={18} />
                                <span>{method.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className={styles.stepNavRow}>
                      <button
                        type="button"
                        className={styles.backBtn}
                        onClick={() => setCurrentStep(2)}
                      >
                        <ArrowLeft size={18} /> Back to Photos
                      </button>
                      <button
                        type="button"
                        className={styles.nextBtn}
                        onClick={() => setCurrentStep(4)}
                      >
                        Review & Submit Request &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Review & Submit */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className={styles.stepBlock}
                >
                  <div className={styles.reviewCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconBadge}>
                        <FileCheck size={22} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>Review Trade-In Request</h3>
                        <p className={styles.cardSubtitle}>Please confirm your vehicle details and contact information before final submission.</p>
                      </div>
                    </div>

                    <div className={styles.reviewSections}>
                      {/* Vehicle Review */}
                      <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlockHeader}>
                          <Car size={18} />
                          <h4>Vehicle Information</h4>
                          <button type="button" onClick={() => setCurrentStep(1)} className={styles.editBtn}>Edit</button>
                        </div>
                        <div className={styles.reviewGrid}>
                          <div><span>Make & Model:</span> <strong>{formData.year} {formData.brand} {formData.model}</strong></div>
                          <div><span>Body & Fuel:</span> <strong>{formData.bodyType} &bull; {formData.fuelType}</strong></div>
                          <div><span>Mileage:</span> <strong>{parseInt(formData.mileage || 0).toLocaleString()} miles</strong></div>
                          <div><span>VIN Number:</span> <strong>{formData.vinNumber || 'N/A'}</strong></div>
                          <div><span>Condition:</span> <strong className={styles.highlightBadge}>{formData.condition}</strong></div>
                          <div><span>Expected Price:</span> <strong>${parseInt(formData.expectedPrice || 0).toLocaleString()}</strong></div>
                        </div>
                      </div>

                      {/* Photos Review */}
                      <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlockHeader}>
                          <Upload size={18} />
                          <h4>Uploaded Photos ({images.length})</h4>
                          <button type="button" onClick={() => setCurrentStep(2)} className={styles.editBtn}>Edit</button>
                        </div>
                        <div className={styles.photoThumbGrid}>
                          {images.map((img) => (
                            <img key={img.id} src={img.url} alt={img.name} className={styles.reviewThumb} />
                          ))}
                        </div>
                      </div>

                      {/* Owner Review */}
                      <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlockHeader}>
                          <User size={18} />
                          <h4>Owner & Contact Info</h4>
                          <button type="button" onClick={() => setCurrentStep(3)} className={styles.editBtn}>Edit</button>
                        </div>
                        <div className={styles.reviewGrid}>
                          <div><span>Owner Name:</span> <strong>{formData.fullName}</strong></div>
                          <div><span>Phone Number:</span> <strong>{formData.phoneNumber}</strong></div>
                          <div><span>Email Address:</span> <strong>{formData.emailAddress}</strong></div>
                          <div><span>Contact Via:</span> <strong>{formData.preferredContact}</strong></div>
                          <div><span>Location:</span> <strong>{formData.city}, {formData.address}</strong></div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.stepNavRow}>
                      <button
                        type="button"
                        className={styles.backBtn}
                        onClick={() => setCurrentStep(3)}
                      >
                        <ArrowLeft size={18} /> Back to Contact Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className={styles.rightCol}>
              {/* Live Summary Card */}
              <SummaryCard
                formData={formData}
                imageCount={images.length}
                onSaveDraft={handleSaveDraft}
                onSubmit={handleSubmitTradeIn}
                isSubmitting={isSubmitting}
              />

              {/* Trade-In Tips Card */}
              <TipsCard />

              {/* Frequently Asked Questions */}
              <FAQCard
                title="Trade-In FAQs"
                faqs={tradeInFaqs}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TradeIn;
