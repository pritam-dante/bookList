function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.className = "test-test";
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const doc = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  doc.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    if (confirm("Are you sure?")) target.parentElement.parentElement.remove();
  }
};

UI.prototype.filterBook = function (target) {
  const text = target.value.toLowerCase();
  document.querySelectorAll(".test-test").forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

UI.prototype.clearInput = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in the fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book added successfully", "success");
    ui.clearInput();
  }

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book deleted Successfully", "success");

  e.preventDefault();
});

document.getElementById("filter").addEventListener("keyup", function (e) {
  const ui = new UI();
  ui.filterBook(e.target);

  e.preventDefault();
});
