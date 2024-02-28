let remove = null;
const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
const themesMenu = document.getElementById("themes-menu");

function getThemePreference() {
	if (typeof localStorage !== "undefined") {
		return localStorage.getItem("theme") ?? "system";
	}
	return window.matchMedia("(prefers-color-scheme: light)").matches
		? "dark"
		: "light";
}

function updateIcon(themePreference) {
	// biome-ignore lint/complexity/noForEach: <explanation>
	document.querySelectorAll(".theme-toggle-icon").forEach((element) => {
		element.style.scale = element.id === themePreference ? "1" : "0";
	});
}

function updateTheme() {
	if (remove != null) {
		remove();
	}
	matchMedia.addEventListener("change", updateTheme);
	remove = () => {
		matchMedia.removeEventListener("change", updateTheme);
	};

	const themePreference = getThemePreference();
	console.log("pref: ", themePreference);
	const isDark =
		themePreference === "dark" ||
		(themePreference === "system" && matchMedia.matches);
	updateIcon(themePreference);
	document.documentElement.classList[isDark ? "add" : "remove"]("dark");
}

updateTheme();

document.addEventListener("click", () => themesMenu.classList.remove("open"));

document.getElementById("theme-toggle-btn").addEventListener("click", (e) => {
	e.stopPropagation();
	const isClosed = !themesMenu.classList.contains("open");
	themesMenu.classList[isClosed ? "add" : "remove"]("open");
});

// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".themes-menu-option").forEach((element) => {
	element.addEventListener("click", (e) => {
		localStorage.setItem("theme", e.target.innerText.toLowerCase().trim());
		updateTheme();
	});
});

document.addEventListener("astro:after-swap", () => {
	if (localStorage.theme === "dark")
		document.documentElement.classList.toggle("dark", true);
});
