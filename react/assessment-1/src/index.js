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
  document.querySelector(".nav__menu").addEventListener("click", onMenuClick);
  window.addEventListener("resize", onViewPortChange);
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

function onMenuClick() {
  const menu = document.querySelector(".nav__menu");
  const navRight = document.querySelector(".nav__right");

  if (menu.dataset.menu === "true") {
    menu.dataset.menu = "false";
    navRight.style = "";
  } else {
    menu.dataset.menu = "true";
    navRight.style.display = "block";
    navRight.style.position = "absolute";
    navRight.style.top = "10rem";
    navRight.style.left = "0";
    navRight.style.width = "100vw";
    navRight.style.padding = "0 0 1rem 2rem";
  }
}

function onViewPortChange(e) {
  const { innerWidth } = e.currentTarget;
  const menu = document.querySelector(".nav__menu");
  const navRight = document.querySelector(".nav__right");

  if (innerWidth > 1000) {
    navRight.style = "";
    menu.dataset.menu = "false";
  }
}
