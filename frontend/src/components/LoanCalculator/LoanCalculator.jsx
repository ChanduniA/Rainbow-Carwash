import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import styles from './LoanCalculator.module.css';

const LoanCalculator = ({ defaultPrice = 100000 }) => {
  const [vehiclePrice, setVehiclePrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [interestRate, setInterestRate] = useState(5.5);
  const [termMonths, setTermMonths] = useState(60);

  // Calculate monthly payment
  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyInterestRate = (interestRate / 100) / 12;
  
  const monthlyPayment = monthlyInterestRate > 0
    ? Math.round((loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) / (Math.pow(1 + monthlyInterestRate, termMonths) - 1))
    : Math.round(loanAmount / termMonths);

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calcHeader}>
        <Calculator size={22} className={styles.headerIcon} />
        <div>
          <h4 className={styles.calcTitle}>Auto Loan Calculator</h4>
          <p className={styles.calcSub}>Estimate your monthly payment schedule.</p>
        </div>
      </div>

      <div className={styles.monthlyPaymentBox}>
        <span className={styles.paymentLabel}>Estimated Monthly Payment</span>
        <strong className={styles.paymentAmount}>${monthlyPayment.toLocaleString()} <small>/mo</small></strong>
      </div>

      <div className={styles.controlsGrid}>
        <div className={styles.field}>
          <label>Vehicle Price ($)</label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value))}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label>Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label>Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label>Loan Term (Months)</label>
          <select
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className={styles.select}
          >
            <option value="36">36 Months (3 Yrs)</option>
            <option value="48">48 Months (4 Yrs)</option>
            <option value="60">60 Months (5 Yrs)</option>
            <option value="72">72 Months (6 Yrs)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
