"use strict";

const library = document.querySelector("table");
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
let myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.description = function () {
    return `${this.title}, by ${this.author}, ${this.pages} pages`;
  };
}

Book.prototype.describe = function () {
  console.log(
    `${this.title} was written by ${this.author} and contains ${this.pages} pages`
  );
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks(lib) {
  //   lib.forEach((book) => console.log(book));
  library.innerHTML = `
  <thead>
    <tr>
      <th class="title">Title</th>
      <th class="author">Author</th>
      <th class="pages">Pages</th>
      <th class="read">Read</th>
    </tr>
  </thead>`;
  lib.forEach((book) =>
    library.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.pages} </td>
        <td> ${book.read} </td>
    <tr>`
    )
  );
}

const book1 = new Book("JS for dummies", "jones", 123, true);
console.log(book1.description());
book1.describe();

const book2 = new Book("Python made easy", "jake", 400, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks(myLibrary);

// event listeners
addBtn.addEventListener("click", function (e) {
  form.classList.toggle("hidden");
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   title = formInputs[0].value;
  //   author = formInputs[1].value;
  //   pages = formInputs[2].value;
  //   read = formInputs[3].value;

  //   const book = new Book(title, author, pages, read);
  //   addBookToLibrary(book);
  //   displayBooks(myLibrary);
  addBookToLibrary2();
});

function addBookToLibrary2() {
  title = formInputs[0].value;
  author = formInputs[1].value;
  pages = formInputs[2].value;
  read = formInputs[3].value;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks(myLibrary);
}
