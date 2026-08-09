import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Award,
  Bot,
  Car,
  ChevronRight
} from 'lucide-react';
import Container from '../../components/Container/Container';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import Card from '../../components/Card/Card';
import { vehiclesData } from '../../data/vehicles';
import { testimonialsData } from '../../data/testimonials';
import { featuresData } from '../../data/features';
import { statsData } from '../../data/stats';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/inventory?search=${encodeURIComponent(searchQuery)}&brand=${selectedBrand}&price=${selectedPrice}`);
  };

  const featuredVehicles = vehiclesData.slice(0, 6);

  const stepsData = [
    {
      step: '01',
      title: 'Browse Cars',
      desc: 'Explore our curated inventory of verified high-performance and luxury vehicles.'
    },
    {
      step: '02',
      title: 'Book Inspection',
      desc: 'Schedule a comprehensive AI & technician 150-point inspection online or at your door.'
    },
    {
      step: '03',
      title: 'Purchase & Trade',
      desc: 'Complete digital contracts, execute trade-in credits, and enjoy home delivery.'
    }
  ];

  return (
    <div className={styles.homeWrapper}>
      {/* SECTION 1: HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Sports Car"
            className={styles.heroImage}
          />
          <div className={styles.darkOverlay}></div>
        </div>

        <Container className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className={styles.heroBadge}>
                <Award size={16} /> Premium Automotive Marketplace
              </span>
              <h1 className={styles.heroTitle}>Find Your Dream Car</h1>
              <p className={styles.heroSubtitle}>
                Buy, Sell and Trade Vehicles with Confidence. Powered by Next-Gen AI Inspection & Escrow Management.
              </p>

              <div className={styles.heroButtons}>
                <Link to="/inventory">
                  <PrimaryButton icon={Car}>Browse Inventory</PrimaryButton>
                </Link>
                <Link to="/trade-in">
                  <SecondaryButton variant="light" icon={TrendingUp}>
                    Trade Your Car
                  </SecondaryButton>
                </Link>
              </div>
            </motion.div>

            {/* Hero Search Bar Box */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={styles.searchBarBox}
            >
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <div className={styles.searchFieldGroup}>
                  <label className={styles.searchLabel}>Search Vehicle</label>
                  <div className={styles.inputInputWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="e.g. Porsche 911, BMW M4..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.heroInput}
                    />
                  </div>
                </div>

                <div className={styles.searchFieldGroup}>
                  <label className={styles.searchLabel}>Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className={styles.heroSelect}
                  >
                    <option value="All">All Brands</option>
                    <option value="Porsche">Porsche</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Lamborghini">Lamborghini</option>
                  </select>
                </div>

                <div className={styles.searchFieldGroup}>
                  <label className={styles.searchLabel}>Price Range</label>
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className={styles.heroSelect}
                  >
                    <option value="All">All Prices</option>
                    <option value="under100k">Under $100,000</option>
                    <option value="100k-200k">$100k - $200k</option>
                    <option value="above200k">Above $200,000</option>
                  </select>
                </div>

                <div className={styles.searchBtnCol}>
                  <PrimaryButton type="submit" icon={Search} fullWidth>
                    Search
                  </PrimaryButton>
                </div>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: FEATURED VEHICLES */}
      <section className={styles.sectionPadding}>
        <Container>
          <SectionTitle
            badge="Exclusive Collection"
            title="Featured Luxury Vehicles"
            subtitle="Explore our handpicked selection of top-tier performance, electric, and executive automobiles."
          />

          <div className={styles.vehicleGrid}>
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className={styles.centerBtnWrapper}>
            <Link to="/inventory">
              <SecondaryButton variant="dark" icon={ChevronRight}>
                View All Vehicles ({vehiclesData.length})
              </SecondaryButton>
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 3: WHY CHOOSE RAINBOW TRADERS */}
      <section className={`${styles.sectionPadding} ${styles.grayBg}`}>
        <Container>
          <SectionTitle
            badge="Why Us"
            title="Why Choose Rainbow Traders"
            subtitle="We re-engineer the car buying and trading experience with transparency, speed, and advanced AI technology."
          />

          <div className={styles.featuresGrid}>
            {featuresData.map((feat) => {
              const IconComp = feat.icon;
              return (
                <Card key={feat.id} className={styles.featureCard}>
                  <div className={styles.featureIconBox}>
                    <IconComp size={28} />
                  </div>
                  <h3 className={styles.featureTitle}>{feat.title}</h3>
                  <p className={styles.featureDesc}>{feat.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className={styles.sectionPadding}>
        <Container>
          <SectionTitle
            badge="Seamless Process"
            title="How Rainbow Traders Works"
            subtitle="Three simple steps from discovery to handing over your keys."
          />

          <div className={styles.stepsTimeline}>
            {stepsData.map((stepItem, index) => (
              <div key={stepItem.step} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>{stepItem.step}</span>
                  {index < stepsData.length - 1 && <div className={styles.timelineLine}></div>}
                </div>
                <h3 className={styles.stepTitle}>{stepItem.title}</h3>
                <p className={styles.stepDesc}>{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5: CUSTOMER TESTIMONIALS */}
      <section className={`${styles.sectionPadding} ${styles.grayBg}`}>
        <Container>
          <SectionTitle
            badge="Client Feedback"
            title="What Our Clients Say"
            subtitle="Read real reviews from auto enthusiasts and owners who bought or traded with us."
          />

          <div className={styles.testimonialsGrid}>
            {testimonialsData.map((item) => (
              <Card key={item.id} className={styles.testimonialCard}>
                <div className={styles.ratingRow}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className={styles.reviewText}>"{item.review}"</p>
                <div className={styles.authorRow}>
                  <img src={item.photo} alt={item.name} className={styles.authorAvatar} />
                  <div>
                    <h4 className={styles.authorName}>{item.name}</h4>
                    <span className={styles.authorRole}>{item.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6: STATISTICS SECTION */}
      <section className={styles.statsSection}>
        <Container>
          <div className={styles.statsGrid}>
            {statsData.map((stat) => (
              <div key={stat.id} className={styles.statBox}>
                <span className={styles.statNum}>
                  {stat.number.toLocaleString()}{stat.suffix}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 7: CALL TO ACTION */}
      <section className={styles.sectionPadding}>
        <Container>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaOverlay}></div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaHeading}>Ready to Find Your Perfect Car?</h2>
              <p className={styles.ctaSub}>
                Join thousands of satisfied drivers. Schedule a free AI valuation or explore our verified luxury vehicle showroom today.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/inventory">
                  <PrimaryButton icon={Car}>Browse Inventory</PrimaryButton>
                </Link>
                <Link to="/contact">
                  <SecondaryButton variant="light" icon={ArrowRight}>
                    Contact Us
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
