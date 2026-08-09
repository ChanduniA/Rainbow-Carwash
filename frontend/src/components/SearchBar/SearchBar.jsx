import React from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange, placeholder = "Search brand, model, features..." }) => {
  return (
    <div className={styles.searchContainer}>
      <Search size={18} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={() => onChange('')} className={styles.clearBtn} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
