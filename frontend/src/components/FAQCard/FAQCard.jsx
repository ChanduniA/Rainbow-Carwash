import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './FAQCard.module.css';

const FAQCard = ({ title = "Frequently Asked Questions", faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.faqCard}>
      <div className={styles.cardHeader}>
        <HelpCircle size={20} className={styles.headerIcon} />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.itemOpen : ''}`}>
              <button
                type="button"
                className={styles.questionBtn}
                onClick={() => toggle(idx)}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className={styles.answerText}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQCard;
