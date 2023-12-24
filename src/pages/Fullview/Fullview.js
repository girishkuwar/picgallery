import React, { useEffect, useState } from 'react';
import styles from './Fullview.module.css';

const Fullview = ({ display, img, close }) => {

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  useEffect(() => {
    const getLikesCount = async () => {
      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${img.id}' %26%26 isliked=true)`, {
        method: "GET"
      });
      let data = await response.text();
      setLikes(JSON.parse(data).items);
    }

    const getDisLikesCount = async () => {
      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${img.id}' %26%26 isliked=false)`, {
        method: "GET"
      });
      let data = await response.text();
      setDislikes(JSON.parse(data).items);
    }

    getLikesCount();
    getDisLikesCount();



  }, [display])



  return (
    <div style={{ display: display }} className={styles.Fullview}>
      <div className={styles.image}>
        <div className={styles.imgcontainer}>
          <img src={"http://127.0.0.1:8090/api/files/" + img.collectionId + "/" + img.id + "/" + img.field} alt="" />
          <button className={styles.closebtn} onClick={close}>Close</button>
          <div className={styles.likescontainer}>
            <h1 className={styles.likes}><i class='bx bx-like'></i> {likes.length}</h1>
            <h1 className={styles.likes}><i class='bx bx-dislike'></i> {dislikes.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fullview;
