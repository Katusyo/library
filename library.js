const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.sayInfo = function() {
    console.log(this.title, this.author, this.pages, this.read);
  };
}

function addBookToLibrary() {
    
}

const book1 = new Book("The Hobbit by J.R.R. Tolkien, 295 pages, not read yet");
info1.sayInfo(); // logs "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"