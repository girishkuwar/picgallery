import React, { useEffect, useState } from 'react';
import styles from './Fullview.module.css';
import imgs from './Group 6.png';
import likeImg from "../../assets/Like_active.svg"
import dislikeImg from "../../assets/disLike_active.svg"
import sendicon from "../../assets/sendIcon.svg"

const Fullview = ({ display, img, close, imgno, totalItems }) => {

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [imgId, setimgId] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [comment, setComment] = useState('');
  const [reload, setReload] = useState(true);
  const id = localStorage.getItem('userid');

  const prew = () => {
    if (pageNo <= 0) {
      setPageNo(imgno);
      return;
    }
    let pno = pageNo;
    pno = pno - 1;
    setIMG(pno);
    setPageNo(pno);
  }

  const next = () => {
    if (pageNo <= 0) {
      setPageNo(imgno);
      return;
    }
    let pno = pageNo;
    pno = pno + 1;
    setIMG(pno);
    setPageNo(pno);
  }

  const setIMG = (no) => {
    fetch(`http://127.0.0.1:8090/api/collections/images/records?page=${no}&perPage=${1}`)
      .then(res => {
        res.json().then(
          data => {
            setimgId(data.items[0]);
            console.log(data.items[0]);
            getLikesCount(data.items[0].id);
            getDisLikesCount(data.items[0].id);
            getComments(data.items[0].id);
          }
        )
      })
  }


  const sendComment = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "com": comment,
      "post": imgId.id,
      "userid": localStorage.getItem('userid'),
      "username": localStorage.getItem('username')
    });

    let response = await fetch("http://127.0.0.1:8090/api/collections/comments/records", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.text();
    console.log('data: ', data);
    getComments(imgId.id);
    setComment('');
    console.log(data);

  }


  const getLikesCount = async (id) => {
    let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${id}' %26%26 isliked=true)`, {
      method: "GET"
    });
    let data = await response.text();
    setLikes(JSON.parse(data).items);
  }

  const getDisLikesCount = async (id) => {
    let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${id}' %26%26 isliked=false)`, {
      method: "GET"
    });
    let data = await response.text();
    setDislikes(JSON.parse(data).items);
  }

  const getComments = async (id) => {
    let response = await fetch(`http://127.0.0.1:8090/api/collections/comments/records?filter=(post='${id}')`, {
      method: "GET"
    });
    let data = await response.text();
    setComments(JSON.parse(data).items);
    console.log(comments);
  }




  console.clear();
  let userLike = likes.find((o) => o.user === id);
  // console.log(userLike);
  let userDisLike = dislikes.find((o) => o.user === id);
  // console.log(userDisLike);
  let LikeID;
  if (userLike) {
    LikeID = userLike.id;
  } else if (userDisLike) {
    LikeID = userDisLike.id;
  }
  console.log(LikeID);



  const LikePost = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }

    if (userLike || userDisLike) {
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

      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records/${LikeID}`, {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
      });

      getLikesCount(img.id);
      getDisLikesCount(img.id);

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

      let response = await fetch("http://127.0.0.1:8090/api/collections/likes/records", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      getLikesCount(img.id);
      getDisLikesCount(img.id);
    }
  }


  const DisLikePost = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }

    if (userLike || userDisLike) {
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

      let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records/${LikeID}`, {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
      });

      getDisLikesCount(img.id);
      getLikesCount(img.id);

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

      let response = await fetch("http://127.0.0.1:8090/api/collections/likes/records", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      getDisLikesCount(img.id);
      getLikesCount(img.id);
    }
  }




















  document.onkeydown = checkkey;

  function checkkey(e) {
    e = e || window.event;
    if (e.keyCode == 37) {
      if (1 < pageNo) {
        prew();
      } else {
        alert("NO MORE PREW");
      }
    } else if (e.keyCode == 39) {
      if (totalItems > pageNo) {
        next();
      } else {
        alert("NO MORE NEXT");
      }
    }
  }



  useEffect(() => {
    setimgId(img);
    setPageNo(imgno);
    getComments(img.id);
    getLikesCount(img.id);
    getDisLikesCount(img.id);
  }, [display, img])



  return (
    <div style={{ display: display }} className={styles.Fullview}>
      <div className={styles.image}>
        <div className={styles.imgcontainer}>
          <div className={styles.imgshower}>
            <img src={"http://127.0.0.1:8090/api/files/" + imgId.collectionId + "/" + imgId.id + "/" + imgId.field} alt="" />
          </div>
          <div className={styles.close}>
            <img className={styles.closeCross} src={imgs} alt="" onClick={close} />
          </div>
          <div className={styles.likescontainer}>
            <h1 onClick={() => { LikePost(imgId.id) }} className={styles.likes}><img src={likeImg} /> {likes.length}</h1>
            <h1 onClick={() => { DisLikePost(imgId.id) }} className={styles.likes}><img src={dislikeImg} /> {dislikes.length}</h1>
          </div>
          <div className={styles.btns}>
            {(1 < pageNo) ? <button className={styles.prewBtn} onClick={prew}>Prew</button> : ""}
            {(totalItems > pageNo) ? <button className={styles.nextBtn} onClick={next}>Next</button> : ""}
          </div>

          <div className={styles.commentcontainer}>
            <div className={styles.comments}>
              {(comments.length > 0) ? <>
                {comments.map((e) => {
                  return <div className={styles.commentBubble}>
                    <h1>{e.username}</h1>
                    <p>{e.com}</p>
                  </div>
                })}
              </> : ""}

            </div>

          </div>
          <div className={styles.commentBox}>
            <input type="text" placeholder="Add comment" onChange={(e) => setComment(e.target.value)} value={comment} />
            {(comment !== "") ? <button onClick={sendComment}><img src={sendicon} alt="" /></button> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fullview;
