import React, { useState } from "react";
import { uploadImage } from "../../hooks/uploadImage.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import WriteImageUpload from "../../components/common/input/WriteImageUpload.jsx";
import Layout from "../../layout";

function PostWrite() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      const config = {
        imageUrl: url,
        title: title,
      };
      axios.post(`https://honeyitem.shop/api/group/${id}/memory`, config, {
        withCredentials: true,
      });
    });
  };

  return (
    <Layout>
      <form 
      style={{width:"100%"}}
      onSubmit={submitHandler}>
        <button type="submit">게시하기</button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <WriteImageUpload
          height="25vh"
          bgcolor="red"
          onImageChange={changeHandler}
        >
          사진 추가하기
        </WriteImageUpload>
      </form>
    </Layout>
  );
}

export default PostWrite;
