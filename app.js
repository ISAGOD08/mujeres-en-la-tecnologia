const $ = (s) => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h !== undefined) e.innerHTML = h; return e; };

// Índice, chips y tarjetas
MUJERES.forEach(m => {
  $("#navMujeres").append(Object.assign(el("a", "", m.nombre), { href: "#" + m.id }));
  $("#chips").append(Object.assign(el("a", "chip", m.nombre), { href: "#" + m.id }));
  const c = el("article", "card");
  c.id = m.id; c.dataset.nombre = (m.nombre + " " + m.pais + " " + m.area).toLowerCase();
  c.style.setProperty("--c", m.color);
  c.innerHTML = `
    <div class="avatar" aria-hidden="true">${m.ini}</div>
    <div class="cuerpo">
      <h3>${m.nombre}</h3>
      <p class="meta">${[m.vida, m.pais, m.area].filter(Boolean).join(" · ")}</p>
      <p>${m.resumen}</p>
      <h4>Sus aportaciones</h4>
      <ul>${m.aportes.map(a => `<li>${a}</li>`).join("")}</ul>
      <p class="curioso"><strong>Dato curioso:</strong> ${m.curioso}</p>
    </div>`;
  $("#tarjetas").append(c);
});

// Línea del tiempo
MUJERES.filter(m => m.hito).sort((a, b) => a.hito[0] - b.hito[0]).forEach(m => {
  const li = el("li", "", `<span class="anio">${m.hito[0]}</span><div><a href="#${m.id}">${m.nombre}</a><p>${m.hito[1]}</p></div>`);
  li.style.setProperty("--c", m.color);
  $("#lineaLista").append(li);
});

// Buscador
$("#buscar").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase(); let n = 0;
  document.querySelectorAll(".card").forEach(c => { const ok = c.dataset.nombre.includes(q); c.hidden = !ok; if (ok) n++; });
  $("#vacio").hidden = n > 0;
});

// Menú móvil
const side = $("#side"), btn = $("#menuBtn");
btn.addEventListener("click", () => { const o = side.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
side.addEventListener("click", e => { if (e.target.tagName === "A") { side.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });

// Resalta en el índice la sección visible
const links = [...document.querySelectorAll("nav a")];
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-30% 0px -60% 0px" });
document.querySelectorAll("section[id], .card").forEach(s => io.observe(s));
