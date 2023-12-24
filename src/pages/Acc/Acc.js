import React, { useEffect, useState } from 'react';
import styles from './Acc.module.css';
import Fullview from '../Fullview/Fullview';

const Acc = () => {
  const [imglist, setImglist] = useState([]);
  const [vievImg, setVievImg] = useState("");
  const [viewer, setviewer] = useState("none");
  const id = localStorage.getItem('userid');

  const bigit = (u) => {
    setVievImg(u);
    setviewer("block");
  }
  const closer = () => {
    setviewer("none");
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8090/api/collections/images/records?filter=(idno='${id}')`)
      .then(res => {
        res.json().then(
          data => {
            setImglist(data.items);
          }
        )
      })
  }, [])



  return (
    <div className={styles.Acc}>
      <Fullview close={closer} display={viewer} img={vievImg} />
      <div className={styles.container}>
        {imglist.map((url) => {
          return (<div key={url.id} className={styles.images}  >
            <h1>{url.name}</h1>
            <img src={"http://127.0.0.1:8090/api/files/" + url.collectionId + "/" + url.id + "/" + url.field + "?thumb=10x30"} onClick={() => bigit(url)} />
            <div className={styles.btns}>
              <button>Like</button>
              <button>Comment</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}


export default Acc;
