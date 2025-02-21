// https://fossheim.io/writing/posts/accessible-theme-picker-html-css-js/
// This is an awesome article

const handleThemeSelection = (event) => {
	const theme = event.target.getAttribute('value');
	document.documentElement.setAttribute('data-selected-theme', theme);

	localStorage.setItem('selected-theme', theme);
}

const themeSelector = document.getElementById('theme-selector');
const radio_inputs = themeSelector.querySelectorAll('input');

const savedTheme = localStorage.getItem('selected-theme');
const defaultTheme = 'mocha';

if (savedTheme && savedTheme !== defaultTheme) {
	document.documentElement.setAttribute('data-selected-theme', savedTheme);
	document.querySelector(`[value=${savedTheme}]`).checked = true;
}

radio_inputs.forEach((radio) => {
	radio.addEventListener('click', handleThemeSelection);
});



const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".main-header .nav-links");

menuToggle.addEventListener("click", function () {
	navLinks.classList.toggle("active");
});
