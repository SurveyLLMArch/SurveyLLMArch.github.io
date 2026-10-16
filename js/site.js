const root = document.documentElement;
const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = stored || (prefersDark ? "dark" : "light");

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
});

document.getElementById("copy-bibtex")?.addEventListener("click", async (event) => {
  const text = document.getElementById("bibtex")?.innerText ?? "";
  try {
    await navigator.clipboard.writeText(text);
    event.currentTarget.textContent = "Copied";
    setTimeout(() => { event.currentTarget.textContent = "Copy"; }, 1400);
  } catch {
    event.currentTarget.textContent = "Select to copy";
  }
});

const links = [...document.querySelectorAll(".nav a[href^='#']")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const spy = () => {
  const y = window.scrollY + 96;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= y) current = section;
  }
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", spy, { passive: true });
spy();
