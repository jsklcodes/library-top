// === MARK: Utils ===
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// === MARK: Data ===
// Initial data structure containing instances of `Book`
let myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
  new Book('1984', 'George Orwell', 328, false),
  new Book('Pride and Prejudice', 'Jane Austen', 432, true),
  new Book('The Catcher in the Rye', 'J.D. Salinger', 234, false),
  new Book('To Kill a Mockingbird', 'Harper Lee', 281, true),
];

// === MARK: Book ===
// Constructor function for books
function Book(title, author, pages, read) {
  this.id = generateId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Method to toggle read status in `Book instances`
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
  return this.read;
};

// === MARK: Dialog ===
// Logic to make the `dialog` element interactive
const addBookDialog = document.querySelector('#add-book-dialog');
const openDialogButton = document.querySelector('#open-dialog-button');
const closeDialogButton = document.querySelector('#close-dialog-button');

const handleOpenDialog = () => addBookDialog.showModal();
const handleCloseDialog = () => addBookDialog.close();

openDialogButton.addEventListener('click', handleOpenDialog);
closeDialogButton.addEventListener('click', handleCloseDialog);
