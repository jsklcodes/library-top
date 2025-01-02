// === MARK: Dialog ===
// Logic to make the `dialog` element interactive
const addBookDialog = document.querySelector('#add-book-dialog');
const openDialogButton = document.querySelector('#open-dialog-button');
const closeDialogButton = document.querySelector('#close-dialog-button');

const handleOpenDialog = () => addBookDialog.showModal();
const handleCloseDialog = () => addBookDialog.close();

openDialogButton.addEventListener('click', handleOpenDialog);
closeDialogButton.addEventListener('click', handleCloseDialog);
