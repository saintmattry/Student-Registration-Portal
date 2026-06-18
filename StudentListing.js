const hover_div = document.getElementById("hover-element");
const footer = document.getElementById("footer");

footer.addEventListener("mouseenter", () => {
  hover_div.style.display = "block";
});

footer.addEventListener("mouseleave", () => {
  hover_div.style.display = "none";
});

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-view");
const closeIcon = document.getElementById("close-nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.add("display");
});

closeIcon.addEventListener("click", () => {
  mobileNav.classList.add(hide);
});