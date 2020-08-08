function getIdFromURL(url) {
  const id=+url.match(/(\d+)/)[0];
  return id;
}

export default getIdFromURL;