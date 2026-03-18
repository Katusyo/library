const myLibrary = [];
document.querySelector(".new-form")
.addEventListener("submit", onSubmitNewBook);

class Book {
    constructor(title, author, pages, completed) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

function addBook(title, author, pages, completed = false) {
  const newBook = new Book(title, author, pages, completed);
  myLibrary.push(newBook);
  };

function removeBook(id) {
    const idx = myLibrary.findIndex((book) => book.id === id);
    if (idx === -1) return;
    return myLibrary.splice(idx, 1);
}

function toggleCompletedStatus(id) {
    const book = myLibrary.find((book) => book.id === id);
    book.toggleCompleted();
}

function displayBooks(id) {
    const books = document.querySelector(".books");
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookWall = createBookWall(myLibrary[i]);
        books.appendChild(bookWall);
    }
}

function createBookWall(data) {
    const {id, title, author, pages, completed} = data;
    const bookWall = document.createElement("div");
    bookWall.classList.add("book-wall");
    const titlePara = document.createElement("p");
    titlePara.textContent = title;
    const infoPara = document.createElement("p");
    infoPara.textContent = `Written by ${author} - ${pages} pages${read ? " - Complete ✓;" : ";"}`;
    const textDiv = document.createElement("div");
    textDiv.appendChild(titlePara);
    textDiv.appendChild(infoPara);

    const removeButton = document.createElement("button");
    removeButton.textContent = "🗑";
    removeButton.setAttribute("data-book-id", id);
    removeButton.addEventListener("click", onRemoveBook);
    removeButton.classList.add("outline-button");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark completed";
    completeButton.setAttribute("data-book-id", id);
    completeButton.addEventListener("click", onReadBook);
    completeButton.classList.add("outline-button");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(removeButton);
    buttonsDiv.classList.add("wall-buttons");

    bookWall.appendChild(textDiv);
    bookWall.appendChild(buttonsDiv);
    return bookWall;
}

function onSubmitNewBook(e) {
    const data = new FormData(e.target);
    const title = data.get("title");
    const author = data.get("author");
    const pages = data.get("pages");
    const completed = !!data.get("completed");
    e.target.reset();
    addBook(title, author, pages, completed);
    displayBooks();
}

function onRemoveBook(e) {
    const { bookId } = e.target.dataset
    removeBook(bookId);
    displayBooks();
}

function onCompletedBook(e) {
    const { bookId } = e.target.dataset;
    toggleCompletedStatus(bookId);
    displayBooks();
}

addBook("1984", "George Orwell", 328, true);
addBook("Batman: The Killing Joke", "Alan Moore, Brian Bolland", 48, true);
addBook("1Q84", "Haruki Murakami", 925, true);

displayBooks();