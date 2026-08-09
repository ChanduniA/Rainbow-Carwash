import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileCheck2,
  Info,
  Car,
  ChevronRight,
  X
} from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import VehicleInfoCard from '../../components/VehicleInfoCard/VehicleInfoCard';
import InspectionCalendar from '../../components/InspectionCalendar/InspectionCalendar';
import TimeSlotSelector from '../../components/TimeSlotSelector/TimeSlotSelector';
import LocationCard, { branchesData } from '../../components/LocationCard/LocationCard';
import BookingSummary from '../../components/BookingSummary/BookingSummary';
import FAQCard from '../../components/FAQCard/FAQCard';
import { vehiclesData } from '../../data/vehicles';
import styles from './Inspection.module.css';

const inspectionFaqs = [
  {
    question: "What is included in the 150-Point Inspection?",
    answer: "Our certified master technicians perform a comprehensive appraisal of engine performance, transmission diagnostics, brake & suspension wear, electronic systems, exterior bodywork, and road test evaluation."
  },
  {
    question: "Is there any cost for the vehicle inspection?",
    answer: "Inspection is 100% free when trading in or buying through Rainbow Traders. A minor $49 refundable deposit applies for standalone certification reports."
  },
  {
    question: "How long does the inspection process take?",
    answer: "The average inspection takes 45 to 60 minutes. You can relax in our executive VIP lounge with complimentary coffee, high-speed Wi-Fi, and refreshments."
  },
  {
    question: "What documents do I need to bring to the appointment?",
    answer: "Please bring a valid Government-issued Driver License, Vehicle Title or Lienholder Payoff statement, current Vehicle Registration, and proof of Insurance."
  }
];

const Inspection = () => {
  // Selected Vehicle State
  const [selectedVehicle, setSelectedVehicle] = useState(vehiclesData[0]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  // Booking State
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [selectedBranchId, setSelectedBranchId] = useState('b1');

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    specialNotes: ''
  });

  const [passId, setPassId] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchBookedSlots = async () => {
    try {
      const res = await fetch('/api/inspection/all');
      const json = await res.json();
      if (json.success) setBookedSlots(json.data);
    } catch (err) {
      console.error('Failed to fetch booked slots:', err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCustomerInfo(prev => ({
          ...prev,
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || ''
        }));
      } catch (err) {
        console.error('Failed to parse user data from local storage:', err);
      }
    }

    fetchBookedSlots();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedBranch = branchesData.find(b => b.id === selectedBranchId) || branchesData[0];

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      showToast('Please select an inspection date on the calendar.');
      return;
    }
    if (!selectedTime) {
      showToast('Please select a time slot.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser ? (parsedUser.email || 'guest') : 'guest';

      const response = await fetch('/api/inspection/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          vehicle: { brand: selectedVehicle.brand, model: selectedVehicle.model, year: selectedVehicle.year }, 
          date: selectedDate, 
          time: selectedTime, 
          branchId: selectedBranchId, 
          customerInfo, 
          userId 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Error booking inspection');
        setIsSubmitting(false);
        return;
      }

      await fetchBookedSlots(); // Instantly refresh availability from DB
      setPassId(data.passId || `INSP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`);
      setBookingConfirmed(true);
    } catch (err) {
      showToast('Error connecting to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = () => {
    showToast('Booking progress reset.');
  };

  return (
    <div className={styles.inspectionPage}>
      <PageHeader
        title="Book Vehicle Inspection"
        subtitle="Choose your preferred date and time."
        breadcrumbs={[{ label: 'Inspection Booking' }]}
      />

      <Container className={styles.containerPadding}>
        {/* Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className={styles.toast}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertCircle size={18} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {bookingConfirmed ? (
          <motion.div
            className={styles.successCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.successIconCircle}>
              <CheckCircle2 size={54} color="#22C55E" />
            </div>
            <h2 className={styles.successTitle}>Inspection Appointment Confirmed!</h2>
            <p className={styles.successSubtitle}>
              Your appointment reservation pass has been issued for the <strong>{selectedVehicle.name}</strong>.
            </p>

            <div className={styles.ticketCard}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketBadge}>PASS ID: #{passId}</span>
                <span className={styles.ticketStatus}>CONFIRMED</span>
              </div>

              <div className={styles.ticketBodyGrid}>
                <div>
                  <span className={styles.ticketLabel}>Customer</span>
                  <strong>{customerInfo.name}</strong>
                </div>
                <div>
                  <span className={styles.ticketLabel}>Vehicle</span>
                  <strong>{selectedVehicle.name} ({selectedVehicle.year})</strong>
                </div>
                <div>
                  <span className={styles.ticketLabel}>Date & Time</span>
                  <strong>
                    {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {selectedTime}
                  </strong>
                </div>
                <div>
                  <span className={styles.ticketLabel}>Branch Location</span>
                  <strong>{selectedBranch.name}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={styles.resetBookingBtn}
              onClick={() => setBookingConfirmed(false)}
            >
              Book Another Inspection
            </button>
          </motion.div>
        ) : (
          <div className={styles.layoutGrid}>
            {/* Main Content Area (Sections 1 to 6) */}
            <div className={styles.mainCol}>
              {/* SECTION 1: Selected Vehicle Card */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <Car size={18} /> SECTION 1 &bull; VEHICLE SELECTION
                </div>
                <VehicleInfoCard
                  vehicle={selectedVehicle}
                  onSelectOther={() => setShowVehicleModal(true)}
                />
              </section>

              {/* SECTION 2: Booking Calendar */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <Calendar size={18} /> SECTION 2 &bull; DATE SELECTION
                </div>
                <InspectionCalendar
                  selectedDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    // Also reset selected time if it's booked on the newly selected date
                  }}
                  bookedSlots={bookedSlots}
                />
              </section>

              {/* SECTION 3: Time Slots */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <Clock size={18} /> SECTION 3 &bull; TIME SLOT
                </div>
                <TimeSlotSelector
                  selectedTime={selectedTime}
                  onSelectTime={(slot) => {
                    setSelectedTime(slot);
                    showToast(`Time slot set to ${slot}`);
                  }}
                  selectedDate={selectedDate}
                  bookedSlots={bookedSlots}
                />
              </section>

              {/* SECTION 4: Inspection Location */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <MapPin size={18} /> SECTION 4 &bull; SERVICE BRANCH & MAP
                </div>
                <LocationCard
                  selectedBranchId={selectedBranchId}
                  onSelectBranch={(bId) => setSelectedBranchId(bId)}
                />
              </section>

              {/* SECTION 5: Customer Information */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <User size={18} /> SECTION 5 &bull; CUSTOMER INFORMATION
                </div>
                <div className={styles.customerFormCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBadge}>
                      <User size={22} />
                    </div>
                    <div>
                      <h3 className={styles.cardTitle}>Customer Information</h3>
                      <p className={styles.cardSubtitle}>Enter your contact details to receive instant SMS and email appointment reminders.</p>
                    </div>
                  </div>

                  <div className={styles.customerGrid}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="custName" className={styles.label}>Full Name *</label>
                      <input
                        type="text"
                        id="custName"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleCustomerChange}
                        placeholder="e.g. Marcus Vance"
                        className={styles.textInput}
                        required
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="custPhone" className={styles.label}>Phone Number *</label>
                      <input
                        type="tel"
                        id="custPhone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleCustomerChange}
                        placeholder="e.g. +1 (555) 987-6543"
                        className={styles.textInput}
                        required
                      />
                    </div>

                    <div className={`${styles.fieldGroup} ${styles.fullRow}`}>
                      <label htmlFor="custEmail" className={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        id="custEmail"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleCustomerChange}
                        placeholder="e.g. marcus@example.com"
                        className={styles.textInput}
                        required
                      />
                    </div>

                    <div className={`${styles.fieldGroup} ${styles.fullRow}`}>
                      <label htmlFor="specialNotes" className={styles.label}>
                        <FileText size={16} style={{ display: 'inline', marginRight: '6px' }} />
                        Special Notes or Service Requests (Optional)
                      </label>
                      <textarea
                        id="specialNotes"
                        name="specialNotes"
                        rows={3}
                        value={customerInfo.specialNotes}
                        onChange={handleCustomerChange}
                        placeholder="Mention any specific areas you'd like inspected (e.g. brakes, battery, tire tread)..."
                        className={styles.textareaInput}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 6: Booking Summary */}
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  <FileCheck2 size={18} /> SECTION 6 &bull; FINAL RESERVATION SUMMARY
                </div>
                <BookingSummary
                  vehicle={selectedVehicle}
                  date={selectedDate}
                  time={selectedTime}
                  branch={selectedBranch}
                  onConfirm={handleConfirmBooking}
                  onCancel={handleCancelBooking}
                  isSubmitting={isSubmitting}
                />
              </section>
            </div>

            {/* Right Sidebar */}
            <div className={styles.sideCol}>
              {/* Inspection Information Card */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <ShieldCheck size={22} className={styles.infoCardIcon} />
                  <div>
                    <h3 className={styles.infoCardTitle}>Inspection Information</h3>
                    <span className={styles.infoCardSub}>Standard Operating Procedures</span>
                  </div>
                </div>

                {/* Required Documents */}
                <div className={styles.infoBlock}>
                  <h4 className={styles.infoBlockTitle}>Required Documents</h4>
                  <ul className={styles.infoList}>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      Government ID / Driver License
                    </li>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      Original Vehicle Title or Lienholder Doc
                    </li>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      Current Insurance Card
                    </li>
                  </ul>
                </div>

                {/* Inspection Process */}
                <div className={styles.infoBlock}>
                  <h4 className={styles.infoBlockTitle}>Inspection Process (3 Steps)</h4>
                  <div className={styles.processSteps}>
                    <div className={styles.processItem}>
                      <span className={styles.processNum}>1</span>
                      <div>
                        <strong>Check-In & Keys Handover</strong>
                        <p>Service advisor verifies vehicle VIN & mileage.</p>
                      </div>
                    </div>
                    <div className={styles.processItem}>
                      <span className={styles.processNum}>2</span>
                      <div>
                        <strong>150-Point Dyno & Bay Check</strong>
                        <p>Master technician tests engine, chassis & OBD-II diagnostics.</p>
                      </div>
                    </div>
                    <div className={styles.processItem}>
                      <span className={styles.processNum}>3</span>
                      <div>
                        <strong>Digital Valuation Certificate</strong>
                        <p>Receive printout & digital report copy.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className={styles.notesBox}>
                  <Info size={16} className={styles.notesIcon} />
                  <p className={styles.notesText}>
                    <strong>Important Note:</strong> Please arrive 10 minutes prior to your time slot. If you need to reschedule, use your reference pass link or call branch support.
                  </p>
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <FAQCard
                title="Inspection FAQs"
                faqs={inspectionFaqs}
              />
            </div>
          </div>
        )}

        {/* Modal for Switching Selected Vehicle */}
        <AnimatePresence>
          {showVehicleModal && (
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVehicleModal(false)}
            >
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3>Select Vehicle for Inspection</h3>
                  <button
                    type="button"
                    className={styles.closeModalBtn}
                    onClick={() => setShowVehicleModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className={styles.modalGrid}>
                  {vehiclesData.map((v) => (
                    <div
                      key={v.id}
                      className={`${styles.modalVehicleCard} ${selectedVehicle.id === v.id ? styles.selectedVehicleCard : ''}`}
                      onClick={() => {
                        setSelectedVehicle(v);
                        setShowVehicleModal(false);
                        showToast(`Selected ${v.name}`);
                      }}
                    >
                      <img src={v.image} alt={v.name} className={styles.modalVehicleImg} />
                      <div className={styles.modalVehicleMeta}>
                        <strong>{v.name}</strong>
                        <span>${v.price?.toLocaleString()} &bull; {v.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Inspection;
