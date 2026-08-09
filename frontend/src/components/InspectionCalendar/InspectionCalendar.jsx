import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import styles from './InspectionCalendar.module.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const InspectionCalendar = ({ selectedDate, onSelectDate, bookedSlots = [] }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Helper to generate days matrix
  const getDaysArray = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    // Blank slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(currentYear, currentMonth, d));
    }
    return days;
  };

  const daysList = getDaysArray();

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isDateDisabled = (dateObj) => {
    if (!dateObj) return true;
    
    // Disable past dates
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dateObj < startOfToday) return true;

    // Disable Sundays (Day 0)
    if (dateObj.getDay() === 0) return true;

    // Check if fully booked (all 8 standard slots are taken)
    const dateBookings = bookedSlots.filter(slot => {
      if (!slot.date) return false;
      const slotDate = new Date(slot.date);
      return slotDate.getDate() === dateObj.getDate() && 
             slotDate.getMonth() === dateObj.getMonth() && 
             slotDate.getFullYear() === dateObj.getFullYear();
    });

    // 8 is the max slots available per day in TimeSlotSelector
    if (dateBookings.length >= 8) return true;

    return false;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <CalendarIcon size={22} className={styles.icon} />
          <div>
            <h3 className={styles.title}>Select Inspection Date</h3>
            <p className={styles.subtitle}>Available Monday through Saturday for 150-point comprehensive inspection.</p>
          </div>
        </div>

        <div className={styles.monthNav}>
          <button type="button" className={styles.navBtn} onClick={handlePrevMonth}>
            <ChevronLeft size={20} />
          </button>
          <span className={styles.currentMonthLabel}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button type="button" className={styles.navBtn} onClick={handleNextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.weekHeader}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.weekDayLabel}>
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentMonth}-${currentYear}`}
          className={styles.daysGrid}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {daysList.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className={styles.emptySlot} />;
            }

            const disabled = isDateDisabled(dateObj);
            const isToday = isSameDay(dateObj, today);
            const isSelected = isSameDay(dateObj, selectedDate);

            return (
              <motion.button
                key={dateObj.toISOString()}
                type="button"
                className={`
                  ${styles.dayCell}
                  ${disabled ? styles.disabledCell : ''}
                  ${isToday ? styles.todayCell : ''}
                  ${isSelected ? styles.selectedCell : ''}
                `}
                disabled={disabled}
                onClick={() => !disabled && onSelectDate(dateObj)}
                whileHover={!disabled ? { scale: 1.08 } : {}}
                whileTap={!disabled ? { scale: 0.94 } : {}}
              >
                <span className={styles.dateNumber}>{dateObj.getDate()}</span>
                {isToday && <span className={styles.todayIndicator}>Today</span>}
                {disabled && dateObj >= today && dateObj.getDay() !== 0 && (
                  <span className={styles.bookedTag}>Booked</span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotAvailable}`} /> Available
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotToday}`} /> Today
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotSelected}`} /> Selected
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotDisabled}`} /> Fully Booked / Closed
        </div>
      </div>
    </div>
  );
};

export default InspectionCalendar;
