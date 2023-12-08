import React, { useEffect, useState } from 'react';
import styles from './UploadPage.module.css';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.config"
import { v4 } from "uuid"

const UploadPage = () => {
  const [ImageUpload, setImageUpload] = useState("");
  const [name, setName] = useState("");  




  const uploadFile = () => {
    if (ImageUpload == null) return;
    const imgRef = ref(storage, `images/${ImageUpload.name + v4()}`);
    uploadBytes(imgRef, ImageUpload).then(() => {
      window.location.reload();
    })
  }
  
  
  
  
  
  let fileinput;
  window.addEventListener('paste', e => {
    setImageUpload(e.clipboardData.files[0]);
    console.log(e.clipboardData.files[0]);
  });
  
  
  
  
  // const imglistRef = ref(storage, "images/")
  // useEffect(() => {
    //   listAll(imglistRef).then((res) => {
      //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImglist((prev) => [...prev, url]);
  //       });
  //     })
  //   })
  // }, [])

  return (

    <div className={styles.UploadPage}>
      <input type="file"  onChange={(event) => { setImageUpload(event.target.files[0]); }} />
      
      <button onClick={uploadFile}> Upload Image</button>
    </div>
  )
};


export default UploadPage