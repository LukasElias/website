const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".main-header .nav-links");

menuToggle.addEventListener("click", function () {
	navLinks.classList.toggle("active");
});
