const myLibrary = [];
document.querySelector(".new-form")
.addEventListener("submit", onSubmitNewBook);

const button = document.querySelector(".search-button");

button.addEventListener("click", () => {
    const event = new Event("input");
    siteSearch.dispatchEvent(event);
});

const siteSearch = document.getElementById("siteSearch");

siteSearch.addEventListener("input", () => {
    const searchTerm = siteSearch.value.toLowerCase();
    const books = document.querySelectorAll(".book");

    let matches = 0;

    books.forEach(book => {
        const text = book.innerText.toLowerCase();

        if (text.includes(searchTerm)) {
            book.style.display = "block";
            matches++;
        } else {
            book.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
    matches === 0 ? "block" : "none";
});

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
    if (book) {
        book.toggleCompleted();
    }
}

function displayBooks() {
    const container = document.querySelector(".books");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const bookEl = createBookWall(book);
        container.appendChild(bookEl);
    });

    siteSearch.dispatchEvent(new Event("input"));
}

function createBookWall(data) {
    const {id, title, author, pages, completed} = data;
    const bookWall = document.createElement("div");
    bookWall.classList.add("book");

    const titlePara = document.createElement("p");
    titlePara.textContent = title;

    const authorPara = document.createElement("p");
    authorPara.textContent = `Author: ${author}`;

    const pagesPara = document.createElement("p");
    pagesPara.textContent =`Pages: ${pages}`;

    const completedPara = document.createElement("p");
    completedPara.textContent = completed ? "Completed ✓" : "Not completed";

    const textDiv = document.createElement("div");
    textDiv.appendChild(titlePara);
    textDiv.appendChild(authorPara);
    textDiv.appendChild(pagesPara);
    textDiv.appendChild(completedPara);

    const removeButton = document.createElement("button");
    removeButton.textContent = "🗑";
    removeButton.setAttribute("data-book-id", id);
    removeButton.addEventListener("click", onRemoveBook);
    removeButton.classList.add("outline-button");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark completed";
    completeButton.setAttribute("data-book-id", id);
    completeButton.addEventListener("click", onCompletedBook);
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
    e.preventDefault();

    const data = new FormData(e.target);
    const title = data.get("title");
    const author = data.get("author");
    const pages = data.get("pages");
    const completed = !!data.get("completed");

    addBook(title, author, pages, completed);
    displayBooks();

    e.target.reset()
}

function onRemoveBook(e) {
    const bookId = e.target.dataset.bookId;
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