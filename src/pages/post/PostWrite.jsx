import React, { useState } from 'react';
import { uploadImage } from '../../hooks/upload.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function PostWrite() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState({});
  const handleChange = (e) => {
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
    <form onSubmit={submitHandler}>
      <button type="submit">게시하기</button>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
    </form>
  );
}

export default PostWrite;
