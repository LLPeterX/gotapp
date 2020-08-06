class gotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const res = await fetch(this._apiBase+url);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Invalid URL ${url} status:${res.stat}`);
    }
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
      url: char.url
    }
  }

  _tranformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,

    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    }
  }

  getIdFromURL(url) {
    const id=+url.match(/(\d+)/)[0];
    return id;
 }

  async getAllCharacters() {
    // Первые персонажи "пустые". Чтобы их пропустить, начнем с 5-й страницы и по 10 персонажей в каждой
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter); // возвращаем массив объектов
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }
  async GetCharacterByURL(url) {
    const newUrl = url.replace(this._apiBase,'');
    const character = await this.getResource(newUrl);
    return this._transformCharacter(character);
  }

  // Получить книги
  async getAllBooks() {
    const books = await this.getResource('/books');
    return books.map(this._transformBook);
  }
  async getBook(id) {
    const book = await this.getResource('/books/'+id);
    return this._transformBook(book);
  }

  // получить дома
  async getAllHouses() {
    const houses = await this.getResource('/houses');
    return houses.map(this._tranformHouse);
  }
  async getHouse(id) {
    const house = await this.getResource('/houses/'+id);
    return this._tranformHouse(house);
  }

}

export default gotService;
