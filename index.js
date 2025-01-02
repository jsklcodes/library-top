// === MARK: Utils ===
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// === MARK: Book ===
// Constructor function for books
function Book(title, author, pages, read) {
  this.id = generateId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// === MARK: Dialog ===
// Logic to make the `dialog` element interactive
const addBookDialog = document.querySelector('#add-book-dialog');
const openDialogButton = document.querySelector('#open-dialog-button');
const closeDialogButton = document.querySelector('#close-dialog-button');

const handleOpenDialog = () => addBookDialog.showModal();
const handleCloseDialog = () => addBookDialog.close();

openDialogButton.addEventListener('click', handleOpenDialog);
closeDialogButton.addEventListener('click', handleCloseDialog);
