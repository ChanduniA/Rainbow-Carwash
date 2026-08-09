import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit3, Trash2, Eye, Check, X } from 'lucide-react';
import styles from './ActionMenu.module.css';

const ActionMenu = ({ onEdit, onDelete, onView, onApprove, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.menuWrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {onView && (
            <button
              type="button"
              className={styles.menuItem}
              onClick={() => { setIsOpen(false); onView(); }}
            >
              <Eye size={14} /> View Details
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              className={styles.menuItem}
              onClick={() => { setIsOpen(false); onEdit(); }}
            >
              <Edit3 size={14} /> Edit
            </button>
          )}

          {onApprove && (
            <button
              type="button"
              className={`${styles.menuItem} ${styles.approveItem}`}
              onClick={() => { setIsOpen(false); onApprove(); }}
            >
              <Check size={14} /> Approve
            </button>
          )}

          {onReject && (
            <button
              type="button"
              className={`${styles.menuItem} ${styles.dangerItem}`}
              onClick={() => { setIsOpen(false); onReject(); }}
            >
              <X size={14} /> Reject
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className={`${styles.menuItem} ${styles.dangerItem}`}
              onClick={() => { setIsOpen(false); onDelete(); }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
