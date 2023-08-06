"use strict";

const library = document.querySelector("#library");
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
let book1 = new Book("JS for dummies", "John smith", 200, false);
let myLibrary = [book1];

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

Book.prototype.toggleReadStatus = function () {
  this.read === true ? (this.read = false) : (this.read = true);
  console.log(`Read status for "${this.title}" changed to "${this.read}"`);
};

function addBookToLibrary() {
  title = formInputs[0].value;
  author = formInputs[1].value;
  pages = formInputs[2].value;
  read = formInputs[3].value;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks(myLibrary);
  console.log(myLibrary);
}

function displayBooks(lib) {
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
    <tr data-index="${myLibrary.indexOf(book)}">
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.pages} </td>
        <td> ${book.read} </td>
        <td> <button class='delete'>Delete </button> </td>
        <td> <button class='toggle-read'>Mark as Read </button> </td>
    <tr>`
    )
  );
}

displayBooks(myLibrary);
console.log(myLibrary);
// event listeners
addBtn.addEventListener("click", function (e) {
  form.classList.toggle("hidden");
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  addBookToLibrary();
});

library.addEventListener("click", function (e) {
  let deleteBtn = e.target.closest(".delete");
  let readBtn = e.target.closest(".toggle-read");
  let row = e.target.closest("tr");
  let index = Number(row.getAttribute("data-index"));

  if (deleteBtn) {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  }

  if (readBtn) {
    let selectedBook = myLibrary[index];
    selectedBook.toggleReadStatus();
    displayBooks(myLibrary);
  }
});
