export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUD_API_PROFILE);

  return fetch(process.env.REACT_APP_CLOUD_API_KEY, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}


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
