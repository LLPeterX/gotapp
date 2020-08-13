class gotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(this._apiBase + url);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Invalid URL ${url} status:${res.stat}`);
    }
  }

  _getIdFromURL = (url) => {
    if(!url) {
      return null;
    }
    const id = +url.match(/(\d+)/)[0];
    //console.log('id=',id);
    return id;
  }

  _transformCharacter = (char) => {
    return {
      id: this._getIdFromURL(char.url),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _tranformHouse = (house) => {
    return {
      id: this._getIdFromURL(house.url),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      //overlord: house.overlord, // url на персонажа
      overlord: this._getIdFromURL(house.overlord),
      ancestralWeapons: house.ancestralWeapons, // array!
     
    }
  }

  _transformBook = (book) => {
    return {
      id: this._getIdFromURL(book.url),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: new Date(book.released).getFullYear(),
    }
  }

  getAllCharacters = async () => {
    // Первые персонажи "пустые". Чтобы их пропустить, начнем с 5-й страницы и по 10 персонажей в каждой
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter); // возвращаем массив объектов
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  // Получить книги
  getAllBooks = async () => {
    const books = await this.getResource('/books');
    return books.map(this._transformBook);
  }
  getBook = async (id) => {
    const book = await this.getResource('/books/' + id);
    return this._transformBook(book);
  }

  // получить дома
  getAllHouses = async () => {
    const houses = await this.getResource('/houses');
    return houses.map(this._tranformHouse);
  }
  getHouse = async (id) => {
    const house = await this.getResource('/houses/' + id);
    const houseData = this._tranformHouse(house);
    // modify overlord (URL) to name of character by id from URL
    if(houseData.overlord) {
      const char = await this.getCharacter(houseData.overlord);
      houseData.overlord = char.name;
    }
    return houseData;
  }

} // end gotService

export default gotService;
