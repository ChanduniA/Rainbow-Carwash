import React from 'react';
import { Star, UserCheck } from 'lucide-react';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ review }) => {
  const { author, rating, comment, date } = review || {
    author: "Verified Customer",
    rating: 5,
    comment: "Outstanding vehicle quality and digital escrow experience.",
    date: "1 week ago"
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.authorBox}>
          <div className={styles.avatar}>
            <UserCheck size={18} />
          </div>
          <div>
            <h5 className={styles.authorName}>{author}</h5>
            <span className={styles.reviewDate}>{date}</span>
          </div>
        </div>

        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < rating ? "#F59E0B" : "#CBD5E1"}
              color={i < rating ? "#F59E0B" : "#CBD5E1"}
            />
          ))}
        </div>
      </div>

      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default ReviewCard;
