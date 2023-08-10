export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_CLOUD_API_NAME);
  return fetch(process.env.REACT_CLOUD_API_KIY, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}

// 불러오는 방식

// import { uploadImage } from './upload';

// post  방식

// const handleSubmit = (e) => {
//   e.preventDefault();
//   uploadImage(file).then((url) => {
//     const config = {
//       img: url,
//     };
//     axios.post('http://localhost:4000/users', config);
//     setResult([...result, config]);
//   });
// };
