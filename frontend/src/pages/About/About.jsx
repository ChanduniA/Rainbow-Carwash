import React from 'react';
import { Award, ShieldCheck, Users, Bot, CheckCircle } from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import Card from '../../components/Card/Card';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <PageHeader
        title="About Rainbow Traders"
        subtitle="Pioneering the future of luxury car sales, trading management, and AI conversational vehicle intelligence."
        breadcrumbs={[{ label: 'About' }]}
      />

      <Container className={styles.containerPadding}>
        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <span className={styles.storyBadge}>Our Mission</span>
            <h2 className={styles.storyTitle}>Redefining Car Retail with Absolute Transparency & AI Technology</h2>
            <p className={styles.storyText}>
              Founded in 2024, Rainbow Traders was built to solve the frustration of traditional car buying and trade-ins. By combining verified master technician inspections with advanced algorithmic valuations and 24/7 AI conversational support, we empower car buyers and sellers with total confidence.
            </p>
            <p className={styles.storyText}>
              Every car in our inventory undergoes a rigorous 150-point diagnostic scan, guaranteed title verification, and escrow trade-in credit security.
            </p>
          </div>
          <div className={styles.storyImgBox}>
            <img
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury Dealership Showroom"
              className={styles.storyImg}
            />
          </div>
        </div>

        <div className={styles.valuesSection}>
          <SectionTitle
            badge="Core Principles"
            title="What Sets Us Apart"
            subtitle="Built on integrity, digital innovation, and passion for automotive excellence."
          />

          <div className={styles.valuesGrid}>
            <Card className={styles.valCard}>
              <Award size={32} className={styles.valIcon} />
              <h3>Certified Quality</h3>
              <p>Handpicked inventory rigorously tested for mechanical and cosmetic perfection.</p>
            </Card>

            <Card className={styles.valCard}>
              <Bot size={32} className={styles.valIcon} />
              <h3>AI-Driven Accuracy</h3>
              <p>Real-time valuation algorithms that guarantee top trade-in payout.</p>
            </Card>

            <Card className={styles.valCard}>
              <ShieldCheck size={32} className={styles.valIcon} />
              <h3>Escrow Protection</h3>
              <p>Secure digital contracts and guaranteed funds transfer before vehicle handover.</p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
