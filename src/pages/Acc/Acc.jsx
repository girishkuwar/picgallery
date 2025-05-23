import React, { useEffect, useState } from 'react';
import styles from './Acc.module.css';

const Acc = () => {
  const [username, setUsername] = useState('');
  const [displayPicture, setDisplayPicture] = useState('');
  const [imglist, setImglist] = useState([]);
  const userID = localStorage.getItem('userid');


  const getUserData = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch(`http://127.0.0.1:8090/api/collections/users/records/${userID}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    data = JSON.parse(data);

    setUsername(data.name);
    setDisplayPicture(data.avatar);
  }

  const getUserpics = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch(`http://127.0.0.1:8090/api/collections/images/records?filter=(idno='${userID}')`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    data = JSON.parse(data);
    console.log(data);
    setImglist(data.items);

  }



  useEffect(() => {
    getUserData();
    getUserpics();

  }, [])

  return (
    <div className={styles.accpage}>
      <div className={styles.biocontainer}>
        <div className={styles.row}>
          <img src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${userID}/${displayPicture}?token=`} alt="" />
          <h1>{username}</h1>
        </div>
      </div>
      <div className={styles.picscontainer}>
        <div className={styles.container}>
          {
            imglist.map((img) => {
              return (
                <div className={styles.images}>
                  <img src={`http://127.0.0.1:8090/api/files/${img.collectionId}/${img.id}/${img.field}?thumb=10x30`} />

                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Acc