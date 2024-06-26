import React, { useEffect, useRef, useState } from 'react';
import styles from './Feeds.module.css';
import Fullview from '../Fullview/Fullview';
import Pagination from '../Pagination/Pagination';
import like_pasive from "../../assets/Like_pasive.svg"
import like_active from "../../assets/Like_active.svg"
import dislike_pasive from "../../assets/disLike_pasive.svg"
import dislike_active from "../../assets/disLike_active.svg"

const Feeds = () => {
  const [imglist, setImglist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [likeinfo, setLikeinfo] = useState([]);
  const [vievImg, setVievImg] = useState("");
  const [viewer, setviewer] = useState("none");
  const [currentImg, setCurrentImg] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [reload, setReload] = useState(true);
  const id = localStorage.getItem('userid');
  const paging = useRef();

  let tmplist = [];

  const bigit = (u, i) => {
    setVievImg(u);
    if (currentPage === 1) {
      i = i + 1;
    } else {
      let page = currentPage - 1;
      i = page * 6 + i + 1;
    }
    setCurrentImg(i);
    setviewer("block");
  }


  const nextImg = () => {
  }


  const closer = () => {
    setviewer("none");
    setCurrentImg(0);
  }

  const like = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }

    if (likeinfo) {
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
      setReload(!reload);

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

      getinfo(likeinfo?.post);
      let data = await response.text();
      setReload(!reload);
    }
  }


  const dislike = async (a) => {
    if (!id) {
      alert("First Sign in ");
      return;
    }

    if (likeinfo) {
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
      setReload(!reload);

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

      getinfo(likeinfo?.post);
      let data = await response.text();
      setReload(!reload);
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



  const MergeList = (List) => {
    List.forEach(async (e, i) => {
      let data = await getSigleData(e.id);
      if (data.items[0]?.isliked === undefined) {
        console.log("UNDEFINED");
      } else {
        tmplist[i].isliked = data.items[0].isliked;
      }
    })
    setImglist(tmplist);
  }


  const getSigleData = async (a) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    let response = await fetch(`http://127.0.0.1:8090/api/collections/likes/records?filter=(post='${a}' %26%26 user='${id}')`, {
      method: "GET",
      headers: headersList
    });
    let data = await response.text();
    return JSON.parse(data);
  }

  const clearinfo = () => {
    setLikeinfo([]);
  }



  const nextpage = () => {
    if (currentPage >= totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  const prevpage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }


  useEffect(() => {
    try {
      fetch(`http://127.0.0.1:8090/api/collections/images/records?page=${currentPage}&perPage=${recordsPerPage}`)
        .then(res => {
          res.json().then(
            data => {
              setImglist(data.items);
              setTotalPages(data.totalPages);
              setTotalItems(data.totalItems);
              tmplist = data.items;
              MergeList(tmplist);
            }
          )
        })
    } catch (error) {
        console.log(error);
    }
  }, [currentPage, reload])

  return (
    <div className={styles.Feeds}>
      <Fullview nextImg={nextImg} close={closer} display={viewer} img={vievImg} imgno={currentImg} totalItems={totalItems} />
      <div className={styles.container}>
        {imglist?.map((url, i) => {
          return (<div onMouseEnter={() => getinfo(url.id)} onMouseLeave={clearinfo} key={url.id} className={styles.images}  >
            <h1>{url.name}</h1>
            <img alt={url.field} ref={paging} src={"http://127.0.0.1:8090/api/files/" + url.collectionId + "/" + url.id + "/" + url.field + "?thumb=10x30"} onClick={() => bigit(url, i)} />
            <div className={styles.btns}>
              <button onClick={() => like(url.id)}>{(url?.isliked) ? <img alt='Like_Active' src={like_active} /> : <img alt='Like_pasive' src={like_pasive} />}  </button>
              <button onClick={() => dislike(url.id)}>{(url?.isliked === false) ? <img alt='Dislike_Active' src={dislike_active} /> : <img alt='DisLike_pasive' src={dislike_pasive} />}</button>
            </div>
          </div>
          );
        })}
      </div>
  
      <Pagination isfirst={(currentPage === 1) ? true : false} isLast={(currentPage === totalPages) ? true : false} next={nextpage} prew={prevpage} />
    </div>
  );
}



export default Feeds;
