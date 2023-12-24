import React from 'react';
import styles from './Pagination.module.css';

const Pagination = () => {
  return (
    <div className={styles.Pagination}>
      <div className={styles.pagination__wrapper}>
        <ul className={styles.pagination}>
          <li><button className={styles.prev} title="previous page">&#10094;</button></li>
          <li><button className={styles.next} title="next page">&#10095;</button></li>
        </ul>
      </div>
    </div>
  )
};


export default Pagination;
