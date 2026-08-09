import React from 'react';
import { motion } from 'framer-motion';
import Container from '../Container/Container';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <div className={styles.headerBanner}>
      <div className={styles.overlay}></div>
      <Container>
        <div className={styles.content}>
          {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.title}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.subtitle}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
