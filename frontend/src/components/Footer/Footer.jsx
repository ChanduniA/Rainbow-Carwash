import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import Container from '../Container/Container';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();

  // Hide Footer on Login, Register, and Admin Login pages
  const authRoutes = ['/login', '/register', '/admin-login', '/admin/login', '/loggin', '/log-in', '/signin', '/sign-in'];
  if (authRoutes.includes(location.pathname)) {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.topSection}>
          {/* Company Column */}
          <div className={styles.companyCol}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <Car size={24} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.brandTitle}>Rainbow</span>
                <span className={styles.brandSubtitle}>Traders</span>
              </div>
            </Link>
            <p className={styles.companyDesc}>
              The next-generation smart car trading ecosystem. Combining luxury vehicle inventory, instant digital appraisals, transparent inspections, and 24/7 AI conversational guidance.
            </p>
            <div className={styles.socialIcons}>
              <a href="#facebook" aria-label="Facebook" className={styles.socialLink}><Facebook size={18} /></a>
              <a href="#twitter" aria-label="Twitter" className={styles.socialLink}><Twitter size={18} /></a>
              <a href="#instagram" aria-label="Instagram" className={styles.socialLink}><Instagram size={18} /></a>
              <a href="#linkedin" aria-label="LinkedIn" className={styles.socialLink}><Linkedin size={18} /></a>
              <a href="#youtube" aria-label="YouTube" className={styles.socialLink}><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link to="/inventory"><ArrowRight size={14} /> Inventory</Link></li>
              <li><Link to="/trade-in"><ArrowRight size={14} /> Trade-In Valuation</Link></li>
              <li><Link to="/inspection"><ArrowRight size={14} /> Book Inspection</Link></li>
              <li><Link to="/ai-assistant"><ArrowRight size={14} /> AI Assistant</Link></li>
              <li><Link to="/dashboard"><ArrowRight size={14} /> Customer Dashboard</Link></li>
              <li><Link to="/admin"><ArrowRight size={14} /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Support & Legal</h4>
            <ul className={styles.linkList}>
              <li><a href="#help"><ArrowRight size={14} /> Help Center</a></li>
              <li><a href="#guarantee"><ArrowRight size={14} /> Certified Guarantee</a></li>
              <li><a href="#finance"><ArrowRight size={14} /> Financing Options</a></li>
              <li><a href="#privacy"><ArrowRight size={14} /> Privacy Policy</a></li>
              <li><a href="#terms"><ArrowRight size={14} /> Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Get In Touch</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.contactIcon} />
                <span>100 Luxury Boulevard, Suite 500, Miami, FL 33101</span>
              </li>
              <li>
                <Phone size={18} className={styles.contactIcon} />
                <span>+1 (800) 555-RAINBOW</span>
              </li>
              <li>
                <Mail size={18} className={styles.contactIcon} />
                <span>support@rainbowtraders.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Rainbow Traders Smart Car Sales & AI System. All Rights Reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
