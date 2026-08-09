import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationContainer}>
      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <div className={styles.pagesList}>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`${styles.pageNumber} ${currentPage === p ? styles.activePage : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
