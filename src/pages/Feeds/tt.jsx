import React, { useEffect, useState } from 'react';
import styles from './Feeds.module.css';
import Fullview from '../Fullview/Fullview';

const Feeds = () => {
  const [imglist, setImglist] = useState([]);
  const [likeinfo, setLikeinfo] = useState([]);
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

  const like = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }
    if (likeinfo?.length === 0) {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      let bodyContent = JSON.stringify({
        "user": id,
        "post": a,
        "isliked": true
      });

      let response = await fetch("http://127.0.0.1:8090/api/collections/likes/records", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      getinfo(likeinfo?.post);
      let data = await response.text();
      console.log(data);

    } else {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      let bodyContent = JSON.stringify({
        "user": id,
        "post": a,
        "isliked": true
      });

      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records/${likeinfo?.id}`, {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
      });

      getinfo(likeinfo?.post);
    }
  }
  const dislike = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }
    if (likeinfo?.length === 0) {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      let bodyContent = JSON.stringify({
        "user": id,
        "post": a,
        "isliked": false
      });

      let response = await fetch("http://127.0.0.1:8090/api/collections/likes/records", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
      getinfo(likeinfo?.post);

      let data = await response.text();
      console.log(JSON.parse(data));
    } else {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      let bodyContent = JSON.stringify({
        "user": id,
        "post": a,
        "isliked": false
      });

      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records/${likeinfo?.id}`, {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
      });

      getinfo(likeinfo?.post);
    }
  }


  const getinfo = async (a) => {
    fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${a}' %26%26 user='${id}')`)
      .then(res => {
        res.json().then(
          data => {
            setLikeinfo(data.items[0]);
          }
        )
      })
  }

  const clearinfo = () => {
    setLikeinfo([]);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8090/api/collections/images/records")
      .then(res => {
        res.json().then(
          data => {
            setImglist(data.items);
          }
        )
      })
  }, [])

  return (
    <div className={styles.Feeds}>
      <Fullview close={closer} display={viewer} img={vievImg} />
      <div className={styles.container}>
        {imglist?.map((url) => {
          return (<div onMouseEnter={() => getinfo(url.id)} onMouseLeave={clearinfo} key={url.id} className={styles.images}  >
            <h1>{url.name}</h1>
            <img src={"http://127.0.0.1:8090/api/files/" + url.collectionId + "/" + url.id + "/" + url.field + "?thumb=10x30"} onClick={() => bigit(url)} />
            <div className={styles.btns}>
              {(likeinfo?.isliked) ? <button><i class='bx bxs-like'></i></button> : <button onClick={() => like(url.id)}><i class='bx bx-like'></i></button>}
              {(!likeinfo?.isliked && likeinfo) ? <button><i class='bx bxs-dislike' style={{ color: '#ffffff' }}></i></button> : <button onClick={() => dislike(url.id)}><i class='bx bx-dislike'></i></button>}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}



export default Feeds;
