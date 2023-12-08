import React from 'react';
import styles from './Fullview.module.css';

const Fullview = ({display,img,close}) => {
  return (
    <div style={{display:display}} className={styles.Fullview}>
      <div className={styles.image}>
        <img src={img} alt="" />
        <button className={styles.closebtn} onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default Fullview;
