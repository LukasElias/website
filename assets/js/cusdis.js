window.addEventListener('load', function () {
    const iframe = document.querySelector('#cusdis_thread iframe');
    if (iframe) {
        let observer = new MutationObserver(() => {
            const scrollHeight = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = scrollHeight + 'px';

			const savedTheme = localStorage.getItem('selected-theme');

			iframe.srcdoc = iframe.srcdoc.replace('<html', `<html data-selected-theme="${savedTheme}"`);

			const my_styles = `
[data-selected-theme="latte"] {
	--Rosewater: rgb(220, 138, 120);
	--Flamingo: rgb(221, 120, 120);
	--Pink: rgb(234, 118, 203);
	--Mauve: rgb(136, 57, 239);
	--Red: rgb(210, 15, 57);
	--Maroon: rgb(230, 69, 83);
	--Peach: rgb(254, 100, 11);
	--Yellow: rgb(223, 142, 29);
	--Green: rgb(64, 160, 43);
	--Teal: rgb(23, 146, 153);
	--Sky: rgb(4, 165, 229);
	--Sapphire: rgb(32, 159, 181);
	--Blue: rgb(30, 102, 245);
	--Lavender: rgb(114, 135, 253);
	--Text: rgb(76, 79, 105);
	--Subtext1: rgb(92, 95, 119);
	--Subtext0: rgb(108, 111, 133);
	--Overlay2: rgb(124, 127, 147);
	--Overlay1: rgb(140, 143, 161);
	--Overlay0: rgb(156, 160, 176);
	--Surface2: rgb(172, 176, 190);
	--Surface1: rgb(188, 192, 204);
	--Surface0: rgb(204, 208, 218);
	--Base: rgb(239, 241, 245);
	--Mantle: rgb(230, 233, 239);
	--Crust: rgb(220, 224, 232);
}

[data-selected-theme="frappe"] {
	--Rosewater: rgb(242, 213, 207);
	--Flamingo: rgb(238, 190, 190);
	--Pink: rgb(244, 184, 228);
	--Mauve: rgb(202, 158, 230);
	--Red: rgb(231, 130, 132);
	--Maroon: rgb(234, 153, 156);
	--Peach: rgb(239, 159, 118);
	--Yellow: rgb(229, 200, 144);
	--Green: rgb(166, 209, 137);
	--Teal: rgb(129, 200, 190);
	--Sky: rgb(153, 209, 219);
	--Sapphire: rgb(133, 193, 220);
	--Blue: rgb(140, 170, 238);
	--Lavender: rgb(186, 187, 241);
	--Text: rgb(198, 208, 245);
	--Subtext1: rgb(181, 191, 226);
	--Subtext0: rgb(165, 173, 206);
	--Overlay2: rgb(148, 156, 187);
	--Overlay1: rgb(131, 139, 167);
	--Overlay0: rgb(115, 121, 148);
	--Surface2: rgb(98, 104, 128);
	--Surface1: rgb(81, 87, 109);
	--Surface0: rgb(65, 69, 89);
	--Base: rgb(48, 52, 70);
	--Mantle: rgb(41, 44, 60);
	--Crust: rgb(35, 38, 52);
}

[data-selected-theme="macchiato"] {
	--Rosewater: rgb(244, 219, 214);
	--Flamingo: rgb(240, 198, 198);
	--Pink: rgb(245, 189, 230);
	--Mauve: rgb(198, 160, 246);
	--Red: rgb(237, 135, 150);
	--Maroon: rgb(238, 153, 160);
	--Peach: rgb(245, 169, 127);
	--Yellow: rgb(238, 212, 159);
	--Green: rgb(166, 218, 149);
	--Teal: rgb(139, 213, 202);
	--Sky: rgb(145, 215, 227);
	--Sapphire: rgb(125, 196, 228);
	--Blue: rgb(138, 173, 244);
	--Lavender: rgb(183, 189, 248);
	--Text: rgb(202, 211, 245);
	--Subtext1: rgb(184, 192, 224);
	--Subtext0: rgb(165, 173, 203);
	--Overlay2: rgb(147, 154, 183);
	--Overlay1: rgb(128, 135, 162);
	--Overlay0: rgb(110, 115, 141);
	--Surface2: rgb(91, 96, 120);
	--Surface1: rgb(73, 77, 100);
	--Surface0: rgb(54, 58, 79);
	--Base: rgb(36, 39, 58);
	--Mantle: rgb(30, 32, 48);
	--Crust: rgb(24, 25, 38);
}

[data-selected-theme="mocha"] {
	--Rosewater: rgb(245, 224, 220);
	--Flamingo: rgb(242, 205, 205);
	--Pink: rgb(245, 194, 231);
	--Mauve: rgb(203, 166, 247);
	--Red: rgb(243, 139, 168);
	--Maroon: rgb(235, 160, 172);
	--Peach: rgb(250, 179, 135);
	--Yellow: rgb(249, 226, 175);
	--Green: rgb(166, 227, 161);
	--Teal: rgb(148, 226, 213);
	--Sky: rgb(137, 220, 235);
	--Sapphire: rgb(116, 199, 236);
	--Blue: rgb(137, 180, 250);
	--Lavender: rgb(180, 190, 254);
	--Text: rgb(205, 214, 244);
	--Subtext1: rgb(186, 194, 222);
	--Subtext0: rgb(166, 173, 200);
	--Overlay2: rgb(147, 153, 178);
	--Overlay1: rgb(127, 132, 156);
	--Overlay0: rgb(108, 112, 134);
	--Surface2: rgb(88, 91, 112);
	--Surface1: rgb(69, 71, 90);
	--Surface0: rgb(49, 50, 68);
	--Base: rgb(30, 30, 46);
	--Mantle: rgb(24, 24, 37);
	--Crust: rgb(17, 17, 27);
}

.text-gray-500 {
	color: var(--Text);
}
.dark\\:text-gray-100,
.dark\\:text-gray-200:not(.text-gray-500),
.dark\\:text-gray-400 {
	color: var(--Lavender);
}

.bg-gray-200 {
	background-color: var(--Text);
	color: var(--Base);
}
.border-color-gray-200,
.border-gray-200 {
	border-color: var(--Text);
	color: var(--Text);
}
		`;

			iframe.srcdoc = iframe.srcdoc.replace('</style>', my_styles + '</style>');
        });

		observer.observe(iframe.contentWindow.document.body, { childList: true, subtree: true });
    }
});
