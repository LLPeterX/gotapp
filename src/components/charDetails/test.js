function getIdFromURL(url) {
   const id=+url.match(/(\d+)/)[0];
   return id;
}

const id = getIdFromURL('https://www.anapioficeandfire.com/api/books/5');
console.log(id);