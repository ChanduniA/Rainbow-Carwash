import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Layers } from 'lucide-react';
import styles from './ChartCard.module.css';

const ChartCard = ({
  title = "Monthly Revenue & Sales Growth",
  subtitle = "Financial performance overview across Q1 - Q3 2026",
  type = "bar", // 'bar' | 'donut' | 'line'
  data = [
    { label: 'Jan', value: 450, secondary: 320 },
    { label: 'Feb', value: 520, secondary: 410 },
    { label: 'Mar', value: 610, secondary: 480 },
    { label: 'Apr', value: 580, secondary: 450 },
    { label: 'May', value: 740, secondary: 610 },
    { label: 'Jun', value: 890, secondary: 720 },
    { label: 'Jul', value: 950, secondary: 810 }
  ],
  categories = [
    { name: 'Luxury Sedans', percentage: 42, color: '#2563EB' },
    { name: 'SUVs & Crossovers', percentage: 31, color: '#22C55E' },
    { name: 'Sports Coupes', percentage: 18, color: '#F59E0B' },
    { name: 'Electric / Hybrids', percentage: 9, color: '#8B5CF6' }
  ]
}) => {
  const maxValue = Math.max(...data.map(d => d.value || 100));

  return (
    <div className={styles.chartCard}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.headerBadge}>
          <BarChart3 size={16} /> Live Data
        </div>
      </div>

      {type === 'bar' && (
        <div className={styles.barChartContainer}>
          <div className={styles.barsGrid}>
            {data.map((item, idx) => {
              const heightPercent = Math.round((item.value / maxValue) * 100);
              const secPercent = Math.round(((item.secondary || 0) / maxValue) * 100);

              return (
                <div key={idx} className={styles.barCol}>
                  <div className={styles.barTrack}>
                    <motion.div
                      className={styles.barFillPrimary}
                      style={{ height: `${heightPercent}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                    >
                      <span className={styles.tooltip}>${item.value}k</span>
                    </motion.div>
                    {item.secondary && (
                      <motion.div
                        className={styles.barFillSecondary}
                        style={{ height: `${secPercent}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${secPercent}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.08 + 0.1 }}
                      />
                    )}
                  </div>
                  <span className={styles.barLabel}>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.legendRow}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#2563EB' }} />
              <span>Revenue ($K)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#22C55E' }} />
              <span>Net Profit ($K)</span>
            </div>
          </div>
        </div>
      )}

      {type === 'donut' && (
        <div className={styles.donutContainer}>
          <div className={styles.categoryList}>
            {categories.map((cat, idx) => (
              <div key={idx} className={styles.catItem}>
                <div className={styles.catMeta}>
                  <span className={styles.catDot} style={{ background: cat.color }} />
                  <span className={styles.catName}>{cat.name}</span>
                </div>
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    style={{ width: `${cat.percentage}%`, background: cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  />
                </div>
                <strong className={styles.catPercent}>{cat.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartCard;
