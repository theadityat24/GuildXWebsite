/*
Copyright 2020 GuildX by GuildX

Version: 2.1
Authors
  [Cursors]
  [Pointers]
*/

const navToggle = document.querySelector(".nav-toggle");

const navLinks = document.querySelectorAll(".nav__link");
navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

console.log("Script found");
