"use strict";
// To Do
// Style table
// style form
// style links
// style theme
// Style with CSS
// Refactor code and remove console logs
// Dom Elements
// Seperate display functions from library class

const libraryUI = document.querySelector("#library");
const display = document.querySelector(".display");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".add");
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".submit");
const formInputs = [...document.querySelectorAll("input")];

let title;
let author;
let pages;
let read;

class BookClass {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  describe = function () {
    console.log(
      `${this.title} was written by ${this.author} and contains ${this.pages} pages`
    );
  };

  toggleReadStatus = function () {
    this.read === true ? (this.read = false) : (this.read = true);
    console.log(`Read status for "${this.title}" changed to "${this.read}"`);
  };
}

let book1 = new BookClass("JS for dummies", "John smith", 200, false);
let myLibrary = [book1];

class Library {
  constructor() {
    this.library = [];
  }

  displayBooks() {
    libraryUI.innerHTML = `
    <thead>
      <tr>
        <th class="title">Title</th>
        <th class="author">Author</th>
        <th class="pages">Pages</th>
        <th class="read">Read</th>
      </tr>
    </thead>`;
    this.library.forEach((book) => {
      let readBtn = book.read === true ? "Unread" : "Read";
      libraryUI.insertAdjacentHTML(
        "beforeend",
        `
      <tr data-index="${this.library.indexOf(book)}">
          <td> ${book.title} </td>
          <td> ${book.author} </td>
          <td> ${book.pages} </td>
          <td> ${book.read} </td>
          <td> <button class='delete'>Delete </button> </td>
          <td> <button class='toggle-read'>Mark as ${readBtn} </button> </td>
      <tr>`
      );
    });
  }

  addBook() {
    title = formInputs[0].value;
    author = formInputs[1].value;
    pages = formInputs[2].value;
    read = formInputs[3].checked ? true : false;

    const book = new BookClass(title, author, pages, read);

    this.library.push(book);
    this.displayBooks();
    console.log(this.library);
  }

  removeBook(index) {
    // this.library.filter(book => book.title !== title)
    this.library.splice(index, 1);
  }
}

const library = new Library();
library.displayBooks();

// event listeners
addBtn.addEventListener("click", function (e) {
  form.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", function () {
  form.classList.toggle("hidden");
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  library.addBook();
});

libraryUI.addEventListener("click", function (e) {
  let deleteBtn = e.target.closest(".delete");
  let readBtn = e.target.closest(".toggle-read");
  let row = e.target.closest("tr");
  let index = Number(row.getAttribute("data-index"));

  if (deleteBtn) {
    // myLibrary.splice(index, 1);
    // displayBooks(myLibrary);
    library.removeBook(index);
    library.displayBooks();
  }

  if (readBtn) {
    let selectedBook = library.library[index];
    selectedBook.toggleReadStatus();
    library.displayBooks(myLibrary);
  }
});
