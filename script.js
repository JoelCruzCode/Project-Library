"use strict";

const library = document.querySelector("table");
const display = document.querySelector(".display");
console.log(library);
console.log(display);

let myLibrary = [];

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
