import React, { useEffect, useState } from 'react';
import styles from './Feeds.module.css';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase.config';
import Fullview from '../Fullview/Fullview';

const Feeds = () => {
  const imglistRef = ref(storage, "images/");
  const [imglist, setImglist] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [vievImg, setVievImg] = useState("");
  const [viewer, setviewer] = useState("none")

  let timeout;
  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  const bigit = (u) => {
    // timeout = setTimeout(() => {
      setVievImg(u);
      setviewer("block");
    // }, 2000);
  }
  // const leaveit = () => {
  //   clearTimeout(timeout);
  // }
  const closer = () => {
    setviewer("none");
  }
  useEffect(() => {
    listAll(imglistRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          getMeta(url, (err, img) => {
            let imgd = {
              asr: img.naturalWidth / img.naturaHeight,
              url: url
            }
            setImglist((prev) => [...prev, imgd]);
            console.log(imglist);
          })
        })
      })
    })
  }, [])

  return (
    <div className={styles.Feeds}>
      <Fullview close={closer} display={viewer} img={vievImg} />
      <div className={styles.container}>
        {imglist.map((url) => {
          return (<div className={styles.images} onClick={() => bigit(url.url)} >
            <h1>Name</h1>
            <img src={url.url} />
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



export default Feeds;
