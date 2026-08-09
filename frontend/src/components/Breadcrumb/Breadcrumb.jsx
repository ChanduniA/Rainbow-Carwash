import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            <Home size={15} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <ChevronRight size={14} className={styles.separator} />
            {item.link ? (
              <Link to={item.link} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
