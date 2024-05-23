let bookId;
let updateMode = false;
async function fetchData() {
  try {
    const data = await Request.getData();
    return data;
  } catch (err) {
    UI.showToast("Failed to load resources!", "Error", false);
    console.error(err);
    return [];
  }
}
function renderBooks(books) {
  UI.render(books);
}
async function getAllBooks() {
  cachedBooks = await fetchData();
  renderBooks(cachedBooks);
  return cachedBooks;
}
getAllBooks();
async function handlePost() {
  const newBook = new Book(
    ...Object.values(inputs).map((input) => {
      if (input.id === "imgInput" && input.value === "") {
        input.value =
          "https://img.freepik.com/premium-vector/general-book-cover-design_731703-368.jpg";
      }
      return input.value;
    })
  );
  try {
    await Request.postData(newBook);
    await getAllBooks();
    UI.createFilterCheckBoxes();
    UI.showToast("Book added successfully!", "Success", true);
  } catch {
    UI.showToast("Failed to add book!", "Error", false);
    console.error(err);
  }
}
async function handleDelete(id) {
  try {
    await Request.deleteData(id);
    await getAllBooks();
    UI.createFilterCheckBoxes();
    UI.showToast("Book deleted successfully!", "Success", true);
  } catch (err) {
    UI.showToast("Failed to delete book!", "Error", false);
    console.error(err);
  }
}
async function handleUpdate() {
  const newBook = new Book(
    ...Object.values(inputs).map((input) => {
      if (input.id === "imgInput" && input.value === "") {
        input.value =
          "https://img.freepik.com/premium-vector/general-book-cover-design_731703-368.jpg";
      }
      return input.value;
    })
  );
  try {
    await Request.updateData(bookId, newBook);
    await getAllBooks();
    updateMode = false;
    UI.createFilterCheckBoxes();
    UI.showToast("Book updated successfully!", "Success", true);
  } catch (err) {
    UI.showToast("Failed to update book!", "Error", false);
    console.error(err);
  }
}
submitBtn.addEventListener("click", () => {
  if (!UI.validation()) return;
  updateMode ? handleUpdate() : handlePost();
  UI.clean();
  bootstrapModal.hide();
});
UI.createFilterCheckBoxes();
UI.typeAndDeleteAnimation();
