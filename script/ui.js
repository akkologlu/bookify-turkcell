let cachedBooks = [];
class UI {
  static createElement(tag, classNames = [], appendChilds = [], textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    classNames.forEach((className) => element.classList.add(className));
    appendChilds.forEach((appendChild) => element.appendChild(appendChild));
    return element;
  }
  static removeChilds(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static async createFilterCheckBoxes() {
    this.removeChilds(dropdownCategoryCheckbox);
    this.removeChilds(dropdownAuthorCheckbox);
    const categorySet = new Set();
    const authorSet = new Set();
    const books = await getAllBooks();
    books.forEach((book) => {
      if (!categorySet.has(book.category)) {
        categorySet.add(book.category);
        const label = this.createElement(
          "label",
          ["form-check-label"],
          [],
          book.category
        );
        const input = this.createElement("input", ["form-check-input"], [], "");
        input.type = "checkbox";
        input.addEventListener("change", () => this.filterByCheckboxes());
        const formCheck = this.createElement(
          "div",
          ["form-check"],
          [input, label],
          ""
        );
        const dropDownItem = this.createElement(
          "li",
          ["dropdown-item"],
          [formCheck],
          ""
        );
        dropdownCategoryCheckbox.appendChild(dropDownItem);
      }
      if (!authorSet.has(book.author)) {
        authorSet.add(book.author);
        const label = this.createElement(
          "label",
          ["form-check-label"],
          [],
          book.author
        );
        const input = this.createElement("input", ["form-check-input"], [], "");
        input.type = "checkbox";
        input.addEventListener("change", () => this.filterByCheckboxes());
        const formCheck = this.createElement(
          "div",
          ["form-check"],
          [input, label],
          ""
        );
        const dropDownItem = this.createElement(
          "li",
          ["dropdown-item"],
          [formCheck],
          ""
        );
        dropdownAuthorCheckbox.appendChild(dropDownItem);
      }
    });
  }
  static createCard(id, name, author, imageSrc, category, date) {
    const nameText = this.createElement("h5", ["card-text"], [], name);
    const nameInner = this.createElement(
      "h6",
      ["card-text", "text-center", "mb-0", "name-inner", "fs-10"],
      [],
      name
    );
    const authorText = this.createElement("p", ["card-title"], [], author);
    const authorTextInner = this.createElement(
      "p",
      ["card-title", "text-center", "author-inner", "fs-10"],
      [],
      author
    );
    const desc = this.createElement(
      "p",
      ["book-desc", "fs-10"],
      [],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, laborum. Lorem ipsum dolor."
    );
    const dateTextInner = this.createElement(
      "p",
      ["book-date", "mb-1", "fs-10"],
      [],
      date
    );
    const image = this.createElement(
      "img",
      [
        "rounded-end",
        "bookImage",
        "position-relative",
        "z-1",
        "object-fit-cover",
      ],
      [],
      ""
    );
    image.src = imageSrc;
    const categoryText = this.createElement(
      "p",
      ["mb-0", "book-category", "fs-10"],
      [],
      category
    );
    const updateIcon = this.createElement(
      "i",
      ["fa-solid", "fa-pen-to-square", "fa-xl"],
      [],
      ""
    );
    const deleteIcon = this.createElement(
      "i",
      ["fa-solid", "fa-eraser", "fa-xl"],
      [],
      ""
    );
    const updateButton = this.createElement(
      "button",
      ["btn", "btn-success", "fs-10", "me-2", "updateButton"],
      [updateIcon],
      ""
    );
    updateButton.setAttribute("data-bs-toggle", "modal");
    updateButton.setAttribute("data-bs-target", "#bookModel");
    updateButton.addEventListener("click", () => {
      this.passValuesToModal(id);
    });

    const deleteButton = this.createElement(
      "button",
      ["btn", "btn-danger", "fs-10", "deleteButton"],
      [deleteIcon],
      ""
    );
    deleteButton.addEventListener("click", () => {
      handleDelete(id);
    });
    const buttonsDiv = this.createElement(
      "div",
      [],
      [updateButton, deleteButton],
      ""
    );
    const bookInnerContent = this.createElement(
      "div",
      [
        "book-inner-content",
        "position-absolute",
        "top-0",
        "z-0",
        "p-2",
        "w-100",
        "rounded-end",
      ],
      [
        nameInner,
        authorTextInner,
        categoryText,
        dateTextInner,
        desc,
        buttonsDiv,
      ]
    );
    const bookImageDiv = this.createElement(
      "div",
      ["bookImageDiv", "position-absolute", "z-1", "rounded-end"],
      [image, bookInnerContent],
      ""
    );
    const rightContent = this.createElement(
      "div",
      [
        "right-content",
        "col-7",
        "col-sm-6",
        "col-lg-5",
        "p-2",
        "position-relative",
      ],
      [bookImageDiv],
      ""
    );
    const cardBody = this.createElement(
      "div",
      ["card-body"],
      [nameText, authorText],
      ""
    );
    const content = this.createElement(
      "div",
      ["col-5", "col-sm-6", "col-lg-7"],
      [cardBody],
      ""
    );
    const row = this.createElement(
      "div",
      ["row", "g-0"],
      [content, rightContent],
      ""
    );
    const card = this.createElement("div", ["card", "h-100"], [row], "");
    const col = this.createElement(
      "div",
      ["col-xl-4", "col-md-6", "book-col"],
      [card],
      ""
    );
    return col;
  }
  static render(array) {
    this.removeChilds(cards);
    array.map((item) => {
      const card = this.createCard(
        item.id,
        item.name,
        item.author,
        item.cover_img,
        item.category,
        item.date
      );
      cards.appendChild(card);
    });
  }
  static async filterByCheckboxes() {
    const selectedCategories = Array.from(
      dropdownCategoryCheckbox.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.nextSibling.textContent);
    const selectedAuthors = Array.from(
      dropdownAuthorCheckbox.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.nextSibling.textContent);
    const filteredBooks = cachedBooks.filter(
      (book) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(book.category)) &&
        (selectedAuthors.length === 0 || selectedAuthors.includes(book.author))
    );
    this.sortBooks(filteredBooks);
  }
  static async passValuesToModal(id) {
    updateMode = true;
    bookId = id;
    const bookIndex = cachedBooks.findIndex((book) => book.id === id);
    for (let key in inputs) {
      inputs[key].value = cachedBooks[bookIndex][key];
    }
  }
  static async filterBySearch(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredData = cachedBooks.filter((book) => {
      return (
        book.name.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText)
      );
    });
    filteredData.length === 0
      ? (cardWarning.textContent =
          "Sorry. How about looking for something else?")
      : (cardWarning.textContent = "");
    UI.sortBooks(filteredData);
  }
  static async sortBooks(books) {
    if (orderRadios.az.checked) {
      books.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderRadios.za.checked) {
      books.sort((a, b) => b.name.localeCompare(a.name));
    } else if (orderRadios.yearAsc.checked) {
      books.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (orderRadios.yearDesc.checked) {
      books.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    UI.render(books);
  }
  static clean() {
    for (let key in inputs) {
      inputs[key].value = "";
      document.querySelector(`#${key}Require`).textContent = "";
    }
  }
  static validation() {
    let allValid = true;
    for (let key in inputs) {
      if (key === "cover_img") continue;
      if (inputs[key].value === "") {
        document.querySelector(`#${key}Require`).textContent =
          "*This field is required!";
        allValid = false;
      }
    }
    return allValid;
  }
  static showToast(message, title, isSuccess) {
    toastTitle.textContent = title;
    toastBody.textContent = message;
    toastTime.textContent = "just now";
    const toast = new bootstrap.Toast(toastElement);
    toastElement.classList.remove("bg-success", "bg-danger");
    toastElement.classList.add(isSuccess ? "bg-success" : "bg-danger");
    toast.show();
  }
  static typeAndDeleteAnimation() {
    const sentences = [
      "War and Peace...",
      "The Alchemist...",
      "A Tale of Two Cities...",
    ];
    let index = 0;
    let currentSentenceIndex = 0;
    function typeAnimation() {
      let sentence = sentences[currentSentenceIndex];
      if (sentence.length > index) {
        searchInput.placeholder += sentence[index];
        index++;
        setTimeout(typeAnimation, 150);
      } else {
        setTimeout(deleteAnimation, 500);
      }
    }
    function deleteAnimation() {
      if (index > 0) {
        searchInput.placeholder = searchInput.placeholder.substring(
          0,
          index - 1
        );
        index--;
        setTimeout(deleteAnimation, 50);
      } else {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        setTimeout(typeAnimation, 500);
      }
    }
    typeAnimation();
  }
}
searchInput.addEventListener("input", (e) => {
  UI.filterBySearch(e);
});
Object.values(orderRadios).forEach((radio) => {
  radio.addEventListener("change", async () => {
    UI.sortBooks(cachedBooks);
  });
});
