import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({next,prew,isfirst,isLast}) => {
  return (
    <div className={styles.Pagination}>
      <div className={styles.pagination__wrapper}>
        <ul className={styles.pagination}>
          {(!isfirst) ? <li><button className={styles.prev} onClick={prew} title="previous page">&#10094;</button></li> : ""}
          {(!isLast) ? <li><button className={styles.next} onClick={next} title="next page">&#10095;</button></li> : ""}
        </ul>
      </div>
    </div>
  )
};


export default Pagination;
