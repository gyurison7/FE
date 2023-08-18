export async function uploadProfileImage(file) {
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
