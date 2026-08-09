import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  required = false,
  className = ''
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {Icon && <Icon className={styles.inputIcon} size={20} />}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.inputField} ${Icon ? styles.hasIcon : ''} ${error ? styles.hasError : ''}`}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
