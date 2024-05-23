const postBtn = document.querySelector("#postBtn");
const submitBtn = document.querySelector("#submit-btn");
const cards = document.querySelector(".cards");
const searchInput = document.querySelector("#search-input");
const dropdownCategoryCheckbox = document.querySelector(
  "#dropdown-category-checkbox"
);
const dropdownAuthorCheckbox = document.querySelector(
  "#dropdown-author-checkbox"
);
const modalCloseBtn = document
  .querySelectorAll(".modal-close-btn")
  .forEach((button) =>
    button.addEventListener("click", () => {
      updateMode = false;
      UI.clean();
    })
  );
const inputs = {
  name: document.querySelector("#nameInput"),
  author: document.querySelector("#authorInput"),
  category: document.querySelector("#categoryInput"),
  date: document.querySelector("#dateInput"),
  cover_img: document.querySelector("#imgInput"),
};
const orderRadios = {
  default: document.querySelector("#orderRadioDefault"),
  az: document.querySelector("#orderRadioAZ"),
  za: document.querySelector("#orderRadioZA"),
  yearAsc: document.querySelector("#orderRadioYearAsc"),
  yearDesc: document.querySelector("#orderRadioYearDesc"),
};
const donKisot = document.querySelector("#don-kisot");
const twoCities = document.querySelector("#a-tale-of-two-cities");
const alchemist = document.querySelector("#alchemist");
const agatha = document.querySelector("#agatha");
const heroBook = document.querySelector("#hero-book");
window.addEventListener("scroll", () => {
  let value = window.scrollY;
  donKisot.style.left = value * -1.5 + "px";
  twoCities.style.left = value * -2.5 + "px";
  alchemist.style.left = value * 1.5 + "px";
  agatha.style.left = value * 2 + "px";
  heroBook.style.bottom = value * -0.75 + "px";
});
bootstrapModal = new bootstrap.Modal(document.getElementById("bookModel"));
for (let key in inputs) {
  inputs[key].addEventListener("input", () => {
    document.querySelector(`#${key}Require`).textContent = "";
  });
}
const cardWarning = document.getElementById("cardWarning");
const toastTitle = document.getElementById("toast-title");
const toastBody = document.getElementById("toast-body");
const toastTime = document.getElementById("toast-time");
const toastElement = document.getElementById("liveToast");
