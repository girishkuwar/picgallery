import React, { useEffect, useState } from 'react';
import styles from './Fullview.module.css';

const Fullview = ({ display, img, close, imgno }) => {

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [imgId, setimgId] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [reload, setReload] = useState(true);

  const prew = () => {
    console.log("Prew", pageNo);
    if (pageNo <= 0) {
      setPageNo(imgno);
      return;
    }
    setPageNo(pageNo - 1);
    console.log("prew - ", pageNo);
    fetch(`http://127.0.0.1:8090/api/collections/images/records?page=${pageNo}&perPage=${1}`)
      .then(res => {
        res.json().then(
          data => {
            console.log("Prew After", pageNo);
            setimgId(data.items[0]);
            setReload(!reload);
          }
        )
      })
  }

  const next = () => {
    console.log("Next", pageNo);
    if (pageNo <= 0) {
      setPageNo(imgno);
      return;
    }
    setPageNo(pageNo + 1);
    fetch(`http://127.0.0.1:8090/api/collections/images/records?page=${pageNo}&perPage=${1}`)
      .then(res => {
        res.json().then(
          data => {
            setimgId(data.items[0]);
            setReload(!reload);
            console.log("Next After", pageNo);
          }
        )
      })
  }



  useEffect(() => {
    const getLikesCount = async () => {
      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${imgId.id}' %26%26 isliked=true)`, {
        method: "GET"
      });
      let data = await response.text();
      setLikes(JSON.parse(data).items);
    }

    const getDisLikesCount = async () => {
      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${imgId.id}' %26%26 isliked=false)`, {
        method: "GET"
      });
      let data = await response.text();
      setDislikes(JSON.parse(data).items);
    }
    getLikesCount();
    getDisLikesCount();
    setimgId(img);
    setPageNo(imgno);

  }, [display, img])



  return (
    <div style={{ display: display }} className={styles.Fullview}>
      <div className={styles.image}>
        <div className={styles.imgcontainer}>
          <img src={"http://127.0.0.1:8090/api/files/" + imgId.collectionId + "/" + imgId.id + "/" + imgId.field} alt="" />
          <button className={styles.closebtn} onClick={close}>Close</button>
          <div className={styles.likescontainer}>
            <h1 className={styles.likes}><i class='bx bx-like'></i> {likes.length}</h1>
            <h1 className={styles.likes}><i class='bx bx-dislike'></i> {dislikes.length}</h1>
            <button onClick={prew}>Prew</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fullview;
