import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sun, Sunset, Moon, Check } from 'lucide-react';
import styles from './TimeSlotSelector.module.css';

const slotGroups = [
  {
    groupLabel: 'Morning',
    icon: Sun,
    slots: ['09:00 AM', '10:00 AM', '11:00 AM']
  },
  {
    groupLabel: 'Afternoon',
    icon: Sunset,
    slots: ['01:00 PM', '02:00 PM', '03:00 PM']
  },
  {
    groupLabel: 'Evening',
    icon: Moon,
    slots: ['04:00 PM', '05:00 PM']
  }
];

const TimeSlotSelector = ({ selectedTime, onSelectTime, selectedDate, bookedSlots = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={20} className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Select Time Slot</h3>
          <p className={styles.subtitle}>Choose an available appointment window for your vehicle inspection.</p>
        </div>
      </div>

      <div className={styles.groupsWrapper}>
        {slotGroups.map((group) => {
          const GroupIcon = group.icon;

          return (
            <div key={group.groupLabel} className={styles.groupBlock}>
              <div className={styles.groupTitle}>
                <GroupIcon size={16} />
                <span>{group.groupLabel}</span>
              </div>

              <div className={styles.slotsGrid}>
                {group.slots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  
                  let isBooked = false;
                  if (selectedDate && bookedSlots.length > 0) {
                    isBooked = bookedSlots.some(b => {
                      if (!b.date || !b.time) return false;
                      const bDate = new Date(b.date);
                      return bDate.getDate() === selectedDate.getDate() && 
                             bDate.getMonth() === selectedDate.getMonth() && 
                             bDate.getFullYear() === selectedDate.getFullYear() &&
                             b.time === slot;
                    });
                  }

                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      className={`${styles.slotBtn} ${isSelected ? styles.selectedSlot : ''} ${isBooked ? styles.bookedSlot : ''}`}
                      onClick={() => !isBooked && onSelectTime(slot)}
                      whileHover={!isBooked ? { scale: 1.04 } : {}}
                      whileTap={!isBooked ? { scale: 0.96 } : {}}
                      disabled={isBooked}
                      style={isBooked ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#F8FAFC' } : {}}
                    >
                      <Clock size={14} className={styles.slotClockIcon} />
                      <span className={styles.slotText}>{isBooked ? 'Booked' : slot}</span>
                      {isSelected && !isBooked && <Check size={14} className={styles.checkIcon} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
