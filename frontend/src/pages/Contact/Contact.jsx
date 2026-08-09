import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import styles from './Contact.module.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      <PageHeader
        title="Contact Our Automotive Advisors"
        subtitle="Have questions about inventory, trade-in valuation, or booking a test drive? We're here to assist you."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <Container className={styles.containerPadding}>
        <div className={styles.contactGrid}>
          {/* Contact Form */}
          <Card className={styles.formCard}>
            <h3 className={styles.formTitle}>Send Us a Message</h3>
            <p className={styles.formSub}>Fill out the form below and an advisor will respond within 15 minutes.</p>

            {submitted ? (
              <div className={styles.successState}>
                <CheckCircle2 size={48} color="#22C55E" />
                <h3>Thank You for Reaching Out!</h3>
                <p>Your message has been assigned to a senior sales concierge.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.rowTwo}>
                  <Input label="Full Name" required placeholder="John Doe" />
                  <Input label="Email Address" type="email" required placeholder="john@example.com" />
                </div>
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help you with your car search or trade-in..."
                    className={styles.textarea}
                  ></textarea>
                </div>
                <PrimaryButton type="submit" icon={Send}>
                  Submit Inquiry
                </PrimaryButton>
              </form>
            )}
          </Card>

          {/* Contact Details */}
          <div className={styles.infoCol}>
            <Card className={styles.infoCard}>
              <h4 className={styles.infoTitle}>Headquarters & Showroom</h4>
              <ul className={styles.infoList}>
                <li>
                  <MapPin size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Visit Us</strong>
                    <p>100 Luxury Boulevard, Suite 500, Miami, FL 33101</p>
                  </div>
                </li>
                <li>
                  <Phone size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Call Us</strong>
                    <p>+1 (800) 555-RAINBOW</p>
                  </div>
                </li>
                <li>
                  <Mail size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Email Support</strong>
                    <p>support@rainbowtraders.com</p>
                  </div>
                </li>
                <li>
                  <Clock size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Showroom Hours</strong>
                    <p>Mon - Sat: 9:00 AM - 8:00 PM • Sun: Closed</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
