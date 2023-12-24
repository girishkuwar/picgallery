import React, { useEffect, useState } from 'react';
import styles from './UploadPage.module.css';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [ImageUpload, setImageUpload] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const uploadFile = async () => {
    if (ImageUpload === "") return;
    let bodyContent = new FormData();
    bodyContent.append("idno", localStorage.getItem('userid'));
    bodyContent.append("name", name);
    bodyContent.append("field", ImageUpload);

    let response = await fetch("http://127.0.0.1:8090/api/collections/images/records", {
      method: "POST",
      body: bodyContent,
    });

    let data = await response.text();
    console.log(data);
    alert("File Uploaded");
  }

useEffect(() => {
  if(!localStorage.getItem('userid')) {
    navigate("/");
  }
}, [])



  return (
    <div className={styles.UploadPage}>

      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} />
      <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]); }} />

      <button onClick={uploadFile}> Upload Image</button>
    </div>
  )
};


export default UploadPage