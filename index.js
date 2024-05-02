startUp();

function startUp() {
  wireUpHandlers();
}

function wireUpHandlers() {
  document
    .querySelector(".nav__item--dropdown")
    .addEventListener("mouseenter", onDropdownEnter);
  document
    .querySelector(".nav__item--dropdown")
    .addEventListener("mouseleave", onDropdownLeave);
}

function onDropdownEnter() {
  const dropdown = document.querySelector(".dropdown");
  const caret = document.querySelector(".dropdown-caret");
  dropdown.style.display = "block";
  caret.innerHTML = `<i class="fa-solid fa-caret-up">`;
}

function onDropdownLeave() {
  const dropdown = document.querySelector(".dropdown");
  const caret = document.querySelector(".dropdown-caret");
  dropdown.style.display = "none";
  caret.innerHTML = `<i class="fa-solid fa-caret-down">`;
}
