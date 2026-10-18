"use strict";

// Content for the interactive insurance and advice dialogs. The homepage lives in index.html.
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.4"/></svg>';

const solutions = [
  {
    id: "vida",
    category: "Vida & família",
    heading: "Cuidar de si e de quem mais gosta",
    detail:
      "Um seguro de vida permite planear a proteção financeira de quem depende de si. As coberturas e os capitais são escolhidos de acordo com as suas necessidades e com as condições da apólice.",
    questions: [
      "Quem pretende proteger?",
      "Que capital faz sentido para a sua família?",
      "Pretende associar o seguro a um crédito?",
    ],
  },
  {
    id: "casa",
    category: "Casa & património",
    heading: "Mais tranquilidade dentro de casa",
    detail:
      "O seguro multirriscos pode reunir várias coberturas para a habitação e o recheio. Ajuda a preparar uma proposta saber se é proprietário ou arrendatário, as características do imóvel e o valor dos bens a segurar.",
    questions: [
      "Pretende proteger o edifício, o recheio ou ambos?",
      "A habitação é própria ou arrendada?",
      "Tem um seguro associado ao crédito habitação?",
    ],
  },
  {
    id: "auto",
    category: "Auto & mobilidade",
    heading: "Confiança em cada novo caminho",
    detail:
      "A escolha do seguro automóvel começa pela utilização que faz do veículo. Além da responsabilidade civil, pode avaliar assistência em viagem, proteção dos ocupantes e danos próprios, conforme as condições disponíveis.",
    questions: [
      "Qual é a marca, o modelo e o ano do veículo?",
      "Que utilização faz do automóvel?",
      "Pretende avaliar coberturas de danos próprios?",
    ],
  },
  {
    id: "saude",
    category: "Saúde & bem-estar",
    heading: "A sua saúde merece atenção",
    detail:
      "Ao avaliar um seguro de saúde, considere a rede de prestadores, as coberturas, os limites, os copagamentos e os períodos de carência. As necessidades de cada pessoa ajudam a orientar a escolha.",
    questions: [
      "Quantas pessoas pretende incluir?",
      "Que cuidados de saúde são prioritários?",
      "Tem uma rede de prestadores preferida?",
    ],
  },
  {
    id: "empresas",
    category: "Empresas & negócios",
    heading: "Proteger o que está a construir",
    detail:
      "Cada atividade tem riscos próprios. A análise pode incluir instalações, equipamentos, responsabilidade civil e proteção dos trabalhadores, tendo em conta as características e as obrigações da empresa.",
    questions: [
      "Qual é a atividade da empresa?",
      "Que instalações e equipamentos utiliza?",
      "Quantas pessoas integram a equipa?",
    ],
  },
  {
    id: "acidentes",
    category: "Acidentes pessoais",
    heading: "Preparar o dia de amanhã",
    detail:
      "Um seguro de acidentes pessoais pode prever proteção em caso de acidente, de acordo com as coberturas contratadas. A profissão, as atividades de lazer e as pessoas a incluir ajudam a definir a proposta.",
    questions: [
      "Quem pretende incluir na proteção?",
      "Qual é a sua profissão?",
      "Pratica atividades desportivas ou de lazer?",
    ],
  },
];

const guides = [
  {
    category: "Proteção familiar",
    title: "O que considerar ao escolher um seguro de vida?",
    body: "Comece por identificar quem depende financeiramente de si, as despesas regulares e os compromissos de crédito. Depois, compare o capital seguro, as coberturas, as exclusões e a evolução do prémio. Leia sempre as condições antes de decidir.",
  },
  {
    category: "A sua casa",
    title: "Edifício e recheio: o que quer proteger?",
    body: "O edifício corresponde à construção e aos elementos que a integram. O recheio inclui os bens que tem em casa. Ao preparar um seguro multirriscos, identifique o que pretende segurar e confirme como devem ser calculados os capitais nas condições da proposta.",
  },
  {
    category: "Mobilidade",
    title: "Como comparar propostas de seguro automóvel?",
    body: "Compare propostas com os mesmos pressupostos: veículo, condutores, utilização e coberturas. Observe também as franquias, os limites da assistência, as exclusões e o custo total. Um prémio mais baixo pode corresponder a uma proteção diferente.",
  },
];

const navigation = document.querySelector("#navigation");
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
};
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a,button")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const carousel = document.querySelector(".carousel");
const slides = [...document.querySelectorAll(".carousel-slide")];
const pagination = document.querySelector(".carousel-pagination");
let currentSlide = 0;
const visibleSlides = () => (innerWidth < 768 ? 1 : innerWidth < 992 ? 2 : 3);
function updateCarousel(announce = false) {
  const count = visibleSlides();
  const pageCount = Math.ceil(slides.length / count);
  const page = Math.max(
    0,
    Math.min(Math.floor(currentSlide / count), pageCount - 1),
  );
  currentSlide = page * count;

  if (pagination.children.length !== pageCount) {
    pagination.replaceChildren(
      ...Array.from({ length: pageCount }, (_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "carousel-dot";
        button.dataset.page = index;
        button.setAttribute("aria-controls", "insurance-carousel");
        const categories = slides
          .slice(index * count, (index + 1) * count)
          .map((slide) =>
            slide.querySelector(".slide-category").textContent.trim(),
          );
        button.setAttribute(
          "aria-label",
          `Ir para página ${index + 1} de ${pageCount}: ${categories.join(", ")}`,
        );
        return button;
      }),
    );
  }
  [...pagination.children].forEach((button, index) => {
    const active = index === page;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-current", String(active));
  });
  const gap = parseFloat(
    getComputedStyle(document.querySelector(".carousel-track")).gap,
  );
  document.querySelector(".carousel-track").style.transform =
    `translateX(-${currentSlide * (slides[0].getBoundingClientRect().width + gap)}px)`;
  slides.forEach((slide, i) => {
    const visible = i >= currentSlide && i < currentSlide + visibleSlides();
    slide.inert = !visible;
    slide.setAttribute("aria-hidden", String(!visible));
  });
  if (announce)
    document.querySelector(".carousel-status").textContent =
      `Página ${page + 1} de ${pageCount}. Seguros ${currentSlide + 1} a ${Math.min(currentSlide + count, slides.length)} de ${slides.length}.`;
}
function moveCarousel(direction) {
  currentSlide += direction * visibleSlides();
  updateCarousel(true);
}
pagination.addEventListener("click", (event) => {
  const button = event.target.closest(".carousel-dot");
  if (!button) return;
  currentSlide = Number(button.dataset.page) * visibleSlides();
  updateCarousel(true);
});
pagination.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") currentSlide = 0;
  if (event.key === "End") currentSlide = slides.length - 1;
  if (event.key === "ArrowLeft") currentSlide -= visibleSlides();
  if (event.key === "ArrowRight") currentSlide += visibleSlides();
  updateCarousel(true);
  pagination.querySelector('[aria-current="true"]').focus();
});
carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveCarousel(event.key === "ArrowRight" ? 1 : -1);
  }
});
let touchStart = null;
carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStart = e.changedTouches[0].clientX;
  },
  { passive: true },
);
carousel.addEventListener(
  "touchend",
  (e) => {
    if (
      touchStart !== null &&
      Math.abs(e.changedTouches[0].clientX - touchStart) > 55
    )
      moveCarousel(e.changedTouches[0].clientX < touchStart ? 1 : -1);
    touchStart = null;
  },
  { passive: true },
);
window.addEventListener("resize", () => {
  updateCarousel();
  if (innerWidth > 991) closeMenu();
});
updateCarousel();

const dialog = document.querySelector("#detail-dialog");
const dialogContent = dialog.querySelector(".dialog-content");
function openDialog(content) {
  dialogContent.innerHTML = content;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}
dialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});

function openContact(solution = "") {
  openDialog(
    `<span class="eyebrow">Vamos conversar</span><h2 id="dialog-title">O que gostaria<br>de proteger?</h2><p>Prepare os pontos que gostaria de conversar connosco.</p><form id="contact-form"><label>O seu nome<input name="name" autocomplete="name" required placeholder="Como se chama?" maxlength="100"></label><label>O seu email<input type="email" name="email" autocomplete="email" required placeholder="nome@exemplo.pt" maxlength="200"></label><label>Estou interessado em<select name="solution"><option value="">Escolha uma opção</option>${solutions.map((s) => `<option value="${s.category}" ${s.id === solution ? "selected" : ""}>${s.category}</option>`).join("")}<option>Outra questão</option></select></label><label>A sua mensagem<textarea name="message" rows="3" placeholder="Conte-nos um pouco do que precisa." maxlength="2500"></textarea></label><p class="form-note">Pré-visualização: este formulário prepara uma mensagem. Os dados não são enviados nem guardados.</p><button class="button" type="submit">Preparar mensagem ${arrow}</button></form>`,
  );
  document.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const message = `Olá, A. Gonçalves - Seguros!\n\nO meu nome é ${values.get("name")}.\nEmail: ${values.get("email")}\nInteresse: ${values.get("solution") || "Informações gerais"}\n\n${values.get("message") || "Gostaria de saber mais sobre as vossas soluções de proteção."}`;
    openDialog(
      `<span class="eyebrow">A sua mensagem</span><h2 id="dialog-title">O primeiro passo<br>está preparado.</h2><p>Esta é a sua mensagem. O envio ficará disponível quando os contactos da empresa forem configurados.</p><pre class="message-preview"></pre><button class="button" id="copy-message">Copiar mensagem ${arrow}</button><p class="copy-status" role="status"></p>`,
    );
    dialogContent.querySelector(".message-preview").textContent = message;
    dialogContent
      .querySelector("#copy-message")
      .addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(message);
          dialogContent.querySelector(".copy-status").textContent =
            "Mensagem copiada.";
        } catch {
          dialogContent.querySelector(".copy-status").textContent =
            "Selecione e copie o texto da mensagem acima.";
        }
      });
    dialog.querySelector(".dialog-close").focus();
  });
}

document.addEventListener("click", (event) => {
  const solutionButton = event.target.closest("[data-solution]");
  if (solutionButton) {
    const solution = solutions.find(
      (s) => s.id === solutionButton.dataset.solution,
    );
    openDialog(
      `<span class="eyebrow">${solution.category}</span><h2 id="dialog-title">${solution.heading}</h2><p>${solution.detail}</p><h3>Vamos começar por aqui</h3><ul>${solution.questions.map((q) => `<li>${q}</li>`).join("")}</ul><p class="form-note">Informação geral. A proteção depende das condições, coberturas e exclusões da apólice contratada.</p><button class="button" id="solution-contact">Conversar sobre este seguro ${arrow}</button>`,
    );
    document
      .querySelector("#solution-contact")
      .addEventListener("click", () => openContact(solution.id));
  }
  if (event.target.closest("[data-contact]")) openContact();
  const guideButton = event.target.closest("[data-guide]");
  if (guideButton) {
    const guide = guides[Number(guideButton.dataset.guide)];
    openDialog(
      `<span class="eyebrow">${guide.category} · Guia essencial</span><h2 id="dialog-title">${guide.title}</h2><p>${guide.body}</p><p class="form-note">Informação geral para apoiar uma conversa. Consulte sempre a documentação específica da proposta.</p><button class="button" data-contact>Esclarecer uma dúvida ${arrow}</button>`,
    );
  }
  if (event.target.closest("[data-privacy]"))
    openDialog(
      '<span class="eyebrow">Privacidade</span><h2 id="dialog-title">A sua privacidade<br>importa.</h2><p>Esta pré-visualização não utiliza cookies de análise nem envia os dados preenchidos no formulário. As mensagens são preparadas apenas no seu navegador e desaparecem quando fecha ou atualiza a página.</p><p>Os tipos de letra, as fotografias e o código do mapa são servidos com o site. Ao visualizar o mapa, o navegador pede imagens ao OpenStreetMap; na vista de satélite, à Esri. Estes serviços recebem os dados técnicos necessários à ligação, incluindo o endereço IP. O botão «Como chegar» abre o Google Maps.</p>',
    );
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
  document.documentElement.classList.add("motion-ready");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          document
            .querySelectorAll(".nav-link")
            .forEach((link) =>
              link.classList.toggle(
                "active",
                link.hash === `#${entry.target.id}`,
              ),
            );
      });
    },
    { rootMargin: "-15% 0px -65% 0px" },
  );
  sections.forEach((section) => navObserver.observe(section));
}

// Exact place coordinates supplied by the owner in the Google Maps listing.
// Use the listing's !3d/!4d values, not its @ viewport centre.
const officeLocation = [41.278481, -8.282931];
const mapPanel = document.querySelector(".location-panel");
const mapStatus = document.querySelector(".map-status");

function initializeOfficeMap() {
  if (!window.L || location.protocol === "file:") {
    mapStatus.textContent =
      "O mapa não está disponível. Utilize o botão Como chegar.";
    mapStatus.classList.remove("sr-only");
    return;
  }

  const map = L.map("office-map", {
    center: officeLocation,
    zoom: 17,
    minZoom: 3,
    maxZoom: 19,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: true,
  });
  map.attributionControl.setPrefix(false);
  const layers = {
    street: L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      className: "map-street-tiles",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }),
    satellite: L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution:
          'Source: <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a>, Vantor, Earthstar Geographics, GIS User Community',
      },
    ),
  };
  let mode = "street";

  for (const layer of Object.values(layers)) {
    let loadedTiles = 0;
    layer.on("loading", () => {
      loadedTiles = 0;
    });
    layer.on("tileload", () => {
      loadedTiles += 1;
    });
    layer.on("load", () => {
      if (!map.hasLayer(layer)) return;
      mapStatus.textContent = loadedTiles
        ? "Mapa disponível."
        : "Não foi possível carregar o mapa. Utilize o botão Como chegar.";
      mapStatus.classList.toggle("sr-only", loadedTiles > 0);
    });
  }

  layers.street.addTo(map);
  const pin = L.divIcon({
    className: "office-marker",
    html: '<span class="office-pin"><img src="assets/brand/logo-white.svg" alt="" /></span>',
    iconSize: [56, 68],
    iconAnchor: [28, 64],
    tooltipAnchor: [0, -68],
  });
  L.marker(officeLocation, {
    icon: pin,
    title: "A. Gonçalves - Seguros, Praça das Pocinhas",
    alt: "Localização da A. Gonçalves - Seguros na Praça das Pocinhas",
    keyboard: true,
  })
    .addTo(map)
    .bindTooltip("A. Gonçalves · Seguros", {
      permanent: true,
      direction: "top",
      className: "office-map-label",
      offset: [0, -4],
    })
    .bindPopup(
      "<strong>A. Gonçalves - Seguros</strong><br>Praça das Pocinhas, 163, Loja H<br>4620-674 Lousada",
    );

  function recenter() {
    map.setView(officeLocation, 17, { animate: false });
    if (innerWidth >= 768)
      map.panBy([-map.getSize().x * 0.16, 0], { animate: false });
  }
  recenter();
  document.querySelector(".map-toolbar").hidden = false;
  document.querySelector(".map-navigation").hidden = false;

  document.querySelectorAll("[data-map-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.mapMode;
      if (nextMode === mode) return;
      map.removeLayer(layers[mode]);
      mode = nextMode;
      mapPanel.classList.toggle("satellite-view", mode === "satellite");
      layers[mode].addTo(map);
      document.querySelectorAll("[data-map-mode]").forEach((control) => {
        const active = control.dataset.mapMode === mode;
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-pressed", String(active));
      });
      mapStatus.textContent =
        mode === "satellite"
          ? "Vista de satélite selecionada."
          : "Vista de mapa selecionada.";
    });
  });
  document.querySelectorAll("[data-map-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.mapAction === "locate") recenter();
      if (button.dataset.mapAction === "in") map.zoomIn();
      if (button.dataset.mapAction === "out") map.zoomOut();
    });
  });
  map.on("zoomend", () => {
    document.querySelector('[data-map-action="in"]').disabled =
      map.getZoom() >= map.getMaxZoom();
    document.querySelector('[data-map-action="out"]').disabled =
      map.getZoom() <= map.getMinZoom();
  });
  const resizeMap = () => {
    map.invalidateSize({ pan: false });
    recenter();
  };
  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeMap).observe(
      document.querySelector("#office-map"),
    );
  } else {
    window.addEventListener("resize", resizeMap);
  }
}

if ("IntersectionObserver" in window) {
  const mapObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        mapObserver.disconnect();
        initializeOfficeMap();
      }
    },
    { rootMargin: "200px" },
  );
  mapObserver.observe(mapPanel);
} else {
  initializeOfficeMap();
}
