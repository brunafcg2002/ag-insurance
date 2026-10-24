"use strict";

// Content for the interactive insurance and FAQ dialogs. The homepage lives in index.html.
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.4"/></svg>';

const externalArrow =
  '<svg class="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

const solutions = [
  {
    "id": "auto",
    "name": "Seguro Automóvel",
    "category": "Auto & mobilidade",
    "heading": "O seu carro protegido, dentro e fora da estrada.",
    "detail": [
      "Um seguro automóvel deve acompanhar a forma como utiliza o seu veículo. Desde a responsabilidade civil obrigatória até às coberturas de danos próprios, existem diferentes soluções para proteger o automóvel e responder a situações inesperadas.",
      "Na A. Gonçalves, ajudamos a comparar opções e a perceber o que está realmente incluído."
    ],
    "questions": [
      "Procura um seguro contra terceiros ou com danos próprios?",
      "Qual é a marca, modelo e ano do veículo?",
      "Tem atualmente um seguro automóvel?"
    ],
    "note": "As coberturas e condições dependem da modalidade e da apólice contratada.",
    "cta": "Conversar sobre este seguro"
  },
  {
    "id": "saude",
    "name": "Seguro de Saúde",
    "category": "Saúde",
    "heading": "Mais opções para cuidar da sua saúde.",
    "detail": [
      "Um seguro de saúde pode facilitar o acesso a consultas, exames, tratamentos e outros cuidados médicos, conforme as coberturas contratadas.",
      "Trabalhamos para encontrar uma solução adequada à sua idade, necessidades e orçamento, explicando as diferenças entre coberturas, redes médicas, limites e períodos de carência."
    ],
    "questions": [
      "Procura um seguro individual ou familiar?",
      "Que cuidados médicos utiliza com maior frequência?",
      "Já tem seguro de saúde ou pretende contratar pela primeira vez?"
    ],
    "note": "Os serviços incluídos, limites, exclusões e períodos de carência variam consoante o produto contratado.",
    "cta": "Conversar sobre este seguro"
  },
  {
    "id": "casa",
    "name": "Seguro Habitação",
    "category": "Casa & património",
    "heading": "A sua casa merece mais do que o seguro obrigatório.",
    "detail": [
      "Incêndios, danos por água, fenómenos naturais ou problemas que afetam terceiros são situações que podem representar despesas significativas.",
      "O seguro multirriscos habitação pode incluir diferentes coberturas para o imóvel, o recheio e a responsabilidade civil. Ajudamos a perceber quais fazem sentido para a sua casa, evitando pagar por proteções desnecessárias ou deixar riscos importantes por cobrir."
    ],
    "questions": [
      "A habitação é própria ou arrendada?",
      "Pretende proteger o edifício, o recheio ou ambos?",
      "Tem atualmente um seguro associado ao crédito habitação?"
    ],
    "note": "As coberturas dependem das condições e exclusões da apólice. A obrigação legal de seguro aplica-se, nomeadamente, ao risco de incêndio em edifícios em propriedade horizontal.",
    "cta": "Conversar sobre este seguro"
  },
  {
    "id": "vida",
    "name": "Seguro de Vida",
    "category": "Vida & família",
    "heading": "Um seguro de vida também o pode proteger em vida.",
    "detail": [
      "O seguro de vida não serve apenas para proteger financeiramente os beneficiários em caso de morte.",
      "Dependendo das coberturas contratadas, pode também assegurar um capital em situações de invalidez ou incapacidade, ajudando a enfrentar momentos em que a estabilidade financeira fica comprometida.",
      "Na A. Gonçalves, explicamos as diferentes modalidades para que saiba exatamente o que está a proteger."
    ],
    "questions": [
      "Pretende um seguro de vida pessoal ou associado ao crédito?",
      "Procura proteção em caso de morte, invalidez ou ambas?",
      "Já tem algum seguro de vida contratado?"
    ],
    "note": "A proteção em vida depende das coberturas de invalidez ou incapacidade incluídas e dos critérios definidos na apólice.",
    "cta": "Conversar sobre este seguro"
  },
  {
    "id": "trabalho",
    "name": "Seguro de Acidentes de Trabalho",
    "category": "Empresas & profissionais",
    "heading": "Obrigatório por lei. Essencial para a sua empresa.",
    "detail": [
      "O seguro de Acidentes de Trabalho é uma obrigação legal e uma proteção fundamental para os trabalhadores e para a atividade empresarial.",
      "Pode assegurar prestações relacionadas com acidentes de trabalho, incluindo assistência médica, tratamentos e indemnizações previstas na legislação e no contrato.",
      "Ajudamos a encontrar uma solução ajustada à atividade, ao número de trabalhadores e à realidade da empresa."
    ],
    "questions": [
      "Qual é a atividade da empresa?",
      "Quantos trabalhadores pretende segurar?",
      "Já tem um seguro de Acidentes de Trabalho em vigor?"
    ],
    "note": "A contratação e as coberturas devem respeitar o enquadramento legal aplicável à atividade e aos trabalhadores.",
    "cta": "Conversar sobre este seguro"
  },
  {
    "id": "poupanca",
    "name": "Poupança e Investimento",
    "category": "Poupança e investimento",
    "heading": "Prepare hoje o futuro que deseja.",
    "detail": [
      "Poupar para a reforma, criar uma reserva financeira ou preparar novos projetos são decisões que merecem planeamento.",
      "Na A. Gonçalves, ajudamos a conhecer as soluções de poupança, PPR e investimento disponíveis, tendo em conta os seus objetivos, o prazo e o nível de risco que está disposto a assumir."
    ],
    "questions": [
      "Pretende poupar para a reforma ou para outro objetivo?",
      "Procura uma solução de poupança ou de investimento?",
      "Prefere privilegiar a segurança do capital ou admite algum risco?"
    ],
    "note": "As condições, os riscos e as garantias dependem do produto contratado. Algumas soluções de investimento podem implicar perda de capital.",
    "cta": "Conversar sobre esta solução"
  }
];

const faqs = [
  {
    "category": "Os nossos serviços",
    "title": "Já tenho seguros noutra seguradora. Posso passar para a A. Gonçalves?",
    "body": [
      "Sim. Não precisa de começar do zero.",
      "Podemos analisar os seus seguros atuais, verificar as coberturas e comparar as condições disponíveis, para perceber se existem alternativas mais adequadas às suas necessidades.",
      "Caso pretenda mudar, ajudamos a compreender os procedimentos e os prazos a respeitar, de acordo com as condições dos contratos em vigor."
    ],
    "cta": "Fale connosco"
  },
  {
    "category": "As nossas parcerias",
    "title": "Conseguem apresentar propostas de diferentes seguradoras?",
    "body": [
      "Sim. Na A. Gonçalves trabalhamos com quatro seguradoras.",
      "Allianz, Zurich, Lusitânia e Real Vida.",
      "Esta diversidade permite-nos analisar diferentes soluções disponíveis, comparar coberturas e condições e aconselhar uma proteção ajustada à sua situação.",
      "Porque o melhor seguro não é necessariamente o mais barato, mas aquele que responde às suas necessidades."
    ],
    "cta": "Pedir uma proposta"
  },
  {
    "category": "Atendimento",
    "title": "Tenho de me deslocar à loja para contratar um seguro?",
    "body": [
      "Não necessariamente.",
      "Pode entrar em contacto connosco por telefone ou e-mail para esclarecer dúvidas, pedir propostas e tratar de grande parte do processo à distância.",
      "Se preferir um atendimento presencial, estamos à sua espera no nosso espaço, na Praça das Pocinhas, em Lousada.",
      "O importante é encontrar a forma mais prática de tratar da sua proteção."
    ],
    "cta": "Vamos conversar"
  }
];

const scenarios = [
  {
    "category": "01 — Automóvel",
    "title": "O carro desapareceu. As prestações ficaram.",
    "body": "Imagine continuar a pagar por um carro que já não tem."
  },
  {
    "category": "02 — Habitação",
    "title": "O problema começou em sua casa. A conta chegou ao vizinho.",
    "body": "Uma simples fuga de água pode transformar-se numa despesa de milhares de euros."
  },
  {
    "category": "03 — Empresas",
    "title": "A empresa parou. As despesas não.",
    "body": "Um incêndio, uma avaria ou outro imprevisto pode comprometer a continuidade do seu negócio."
  }
];

// Official Zurich Portugal offers, checked on 23 October 2026.
const campaigns = [
  {
    "id": "lar-flex",
    "product": "Zurich Lar Flex",
    "title": "Até 15% de desconto",
    "summary": "Z4U + débito direto + seguro Zurich Auto.",
    "solution": "casa",
    "image": "zurich-campanha-casa.jpg",
    "alt": "Família em casa durante uma mudança, na campanha Zurich Lar Flex",
    "start": "2026-01-01",
    "end": "2026-12-31",
    "source": "https://www.zurich.com.pt/pt-pt/particulares/habitacao/lar-flex",
    "conditions": [
      "Para novos contratos subscritos entre 01/01/2026 e 31/12/2026.",
      "5% de desconto pelo registo no portal Z4U, mais 5% pelo pagamento por débito direto e mais 5% se também for cliente Zurich Auto."
    ]
  },
  {
    "id": "auto",
    "product": "Zurich Auto",
    "title": "Até 10% de desconto",
    "summary": "Adesão ao Z4U e pagamento por débito direto.",
    "solution": "auto",
    "image": "zurich-campanha-auto.jpg",
    "alt": "Casal a trocar as chaves junto ao automóvel, na campanha Zurich Auto",
    "start": "2026-02-18",
    "end": "2026-12-31",
    "source": "https://www.zurich.com.pt/pt-pt/particulares/automovel/automovel",
    "conditions": [
      "Campanha Zurich Auto Ligeiros e Comerciais, de 18/02/2026 a 31/12/2026.",
      "5% de desconto pela adesão ao portal de cliente Z4U e mais 5% pelo pagamento por débito em conta bancária."
    ]
  },
  {
    "id": "saude",
    "product": "Zurich Saúde · Opção 3",
    "title": "Oferta de 2 mensalidades",
    "summary": "As duas primeiras, com pagamento mensal.",
    "solution": "saude",
    "image": "zurich-campanha-saude.jpg",
    "alt": "Pulseira WHOOP e aplicação, na campanha Zurich Saúde",
    "start": "2026-10-01",
    "end": "2026-12-31",
    "source": "https://www.zurich.com.pt/pt-pt/particulares/saude/zurich-saude",
    "conditions": [
      "Campanha de 01/10/2026 a 31/12/2026, na subscrição da Opção 3 do Zurich Saúde.",
      "Oferta das duas primeiras mensalidades da primeira anuidade, exclusivamente com fracionamento mensal.",
      "Oferta adicional de pulseira WHOOP e 12 meses de subscrição WHOOP para clientes com idades entre os 30 e os 55 anos."
    ]
  }
];

document.querySelector(".insurers-strip").classList.add("is-ready");

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
  menuToggle.setAttribute("aria-label", open ?"Fechar menu" : "Abrir menu");
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
  document.querySelector(".carousel-controls").hidden = pageCount <= 1;
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
            slide.querySelector(".slide-title").textContent.trim(),
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
      `Página ${page + 1} de ${pageCount}. Campanhas ${currentSlide + 1} a ${Math.min(currentSlide + count, slides.length)} de ${slides.length}.`;
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
  if (innerWidth > 1100) closeMenu();
});
updateCarousel();

function setupMobileCardCarousel(track, label) {
  const items = [...track.children];
  const mobile = window.matchMedia("(max-width: 767px)");
  const controls = document.createElement("div");
  controls.className = "mobile-card-pagination";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", `Páginas: ${label}`);
  const status = document.createElement("span");
  status.className = "sr-only";
  status.setAttribute("role", "status");
  let page = 0;
  let scrollFrame = 0;
  const step = () => track.clientWidth + parseFloat(getComputedStyle(track).columnGap);
  const dots = items.map((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-controls", track.id);
    dot.setAttribute("aria-label", `Ir para página ${index + 1} de ${items.length}: ${item.querySelector("h3").textContent}`);
    dot.addEventListener("click", () => goTo(index));
    controls.append(dot);
    return dot;
  });
  controls.append(status);
  track.after(controls);

  function update(announce = false) {
    controls.hidden = !mobile.matches;
    if (mobile.matches) {
      track.setAttribute("role", "region");
      track.setAttribute("aria-roledescription", "carrossel");
      track.setAttribute("aria-label", label);
      track.tabIndex = 0;
      page = Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / step())));
    } else {
      ["role", "aria-roledescription", "aria-label", "tabindex"].forEach((attribute) => track.removeAttribute(attribute));
    }
    items.forEach((item, index) => {
      item.inert = mobile.matches && index !== page;
      if (mobile.matches) item.setAttribute("aria-hidden", String(index !== page));
      else item.removeAttribute("aria-hidden");
      dots[index].classList.toggle("is-active", index === page);
      dots[index].setAttribute("aria-current", String(index === page));
    });
    if (announce && mobile.matches) status.textContent = `Página ${page + 1} de ${items.length}.`;
  }
  function goTo(index) {
    if (!mobile.matches) return;
    const target = Math.max(0, Math.min(items.length - 1, index));
    track.scrollTo({
      left: target * step(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }
  function onKeydown(event) {
    if (!mobile.matches || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : page + (event.key === "ArrowRight" ? 1 : -1);
    goTo(target);
    if (controls.contains(event.target)) dots[Math.max(0, Math.min(items.length - 1, target))].focus();
  }
  controls.addEventListener("keydown", onKeydown);
  track.addEventListener("keydown", onKeydown);
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => update(true));
  }, { passive: true });
  window.addEventListener("resize", () => {
    track.scrollTo({ left: mobile.matches ? page * step() : 0, behavior: "instant" });
    update();
  });
  update();
}
setupMobileCardCarousel(document.querySelector(".showcase-grid"), "Imprevistos e proteção");
setupMobileCardCarousel(document.querySelector(".blog-grid"), "Perguntas frequentes");

function setupFooterDisclosure(footerInsuranceToggle, footerInsuranceLinks) {
  const footerMobile = window.matchMedia("(max-width: 767px)");
  let footerInsuranceAnimation = null;
  function setFooterInsuranceExpanded(expanded, animate = true) {
    const height = footerInsuranceLinks.getBoundingClientRect().height;
    const opacity = Number(getComputedStyle(footerInsuranceLinks).opacity);
    const padding = getComputedStyle(footerInsuranceLinks).paddingBottom;
    footerInsuranceAnimation?.cancel();
    footerInsuranceToggle.setAttribute("aria-expanded", String(expanded));
    footerInsuranceLinks.inert = !expanded;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduceMotion || !footerInsuranceLinks.animate) {
      footerInsuranceLinks.hidden = !expanded;
      footerInsuranceLinks.style.overflow = "";
      return;
    }
    footerInsuranceLinks.hidden = false;
    footerInsuranceLinks.style.overflow = "hidden";
    const targetHeight = expanded ? footerInsuranceLinks.getBoundingClientRect().height : 0;
    const animation = footerInsuranceLinks.animate([
      { height: `${height}px`, paddingBottom: height ? padding : "0px", opacity: height ? opacity : 0 },
      { height: `${targetHeight}px`, paddingBottom: expanded ? "16px" : "0px", opacity: expanded ? 1 : 0 },
    ], { duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" });
    footerInsuranceAnimation = animation;
    animation.onfinish = () => {
      footerInsuranceLinks.hidden = !expanded;
      footerInsuranceLinks.style.overflow = "";
      animation.cancel();
      footerInsuranceAnimation = null;
    };
  }
  function updateFooterNavigation() {
    footerInsuranceToggle.disabled = !footerMobile.matches;
    setFooterInsuranceExpanded(!footerMobile.matches, false);
  }
  footerInsuranceToggle.addEventListener("click", () => {
    setFooterInsuranceExpanded(footerInsuranceToggle.getAttribute("aria-expanded") !== "true");
  });
  footerMobile.addEventListener("change", updateFooterNavigation);
  updateFooterNavigation();
}
document.querySelectorAll(".footer-insurance-toggle").forEach((toggle) => {
  setupFooterDisclosure(toggle, document.getElementById(toggle.getAttribute("aria-controls")));
});

const dialog = document.querySelector("#detail-dialog");
const dialogContent = dialog.querySelector(".dialog-content");
let dialogCloseTimer = null;
let dialogOpener = null;
let disposeContactSelect = () => {};
function openDialog(content) {
  disposeContactSelect();
  if (!dialog.open) dialogOpener = document.activeElement;
  clearTimeout(dialogCloseTimer);
  dialogContent.innerHTML = content;
  dialog.classList.remove("is-entering", "is-closing");
  dialog.showModal();
  dialog.scrollTop = 0;
  // Restart the entrance when an open dialog changes to another view.
  void dialog.offsetWidth;
  dialog.classList.add("is-entering");
  document.body.classList.add("dialog-open");
  dialog.querySelector(".dialog-close").focus({ preventScroll: true });
}
function finishDialogClose() {
  clearTimeout(dialogCloseTimer);
  if (dialog.open) dialog.close();
}
function closeDialog() {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishDialogClose();
    return;
  }
  dialog.classList.remove("is-entering");
  dialog.classList.add("is-closing");
  // Also finish if the animation is interrupted or unavailable.
  dialogCloseTimer = setTimeout(finishDialogClose, 220);
}
dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDialog();
});
dialog.addEventListener("animationend", (event) => {
  if (event.target === dialog && event.animationName === "dialog-exit") finishDialogClose();
});
dialog.addEventListener("close", () => {
  disposeContactSelect();
  clearTimeout(dialogCloseTimer);
  dialog.classList.remove("is-entering", "is-closing");
  document.body.classList.remove("dialog-open");
  if (dialogOpener?.isConnected && !dialogOpener.closest("[inert]")) dialogOpener.focus({ preventScroll: true });
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) closeDialog();
  }
});

const contactDetails = `<div class="dialog-phones" role="group" aria-label="Contactos"><p>Fale connosco</p>${[...document.querySelectorAll(".footer-contacts .phone-link, .footer-contacts .email-link")].map((link) => link.outerHTML).join("")}</div>`;

function styleContactSelect(select) {
  const controller = new AbortController();
  const { signal } = controller;
  disposeContactSelect = () => controller.abort();
  const wrapper = document.createElement("div");
  wrapper.className = "insurance-select";
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "insurance-select-trigger";
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-label", "Estou interessado em");
  trigger.setAttribute("aria-required", "true");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "insurance-options");
  const value = document.createElement("span");
  trigger.append(value);
  trigger.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>');
  const list = document.createElement("ul");
  list.id = "insurance-options";
  list.className = "insurance-options";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", "Tipo de seguro");
  list.hidden = true;
  let active = select.selectedIndex;
  let search = "";
  let typedAt = 0;
  const options = [...select.options].map((option, index) => {
    const item = document.createElement("li");
    item.id = `insurance-option-${index}`;
    item.setAttribute("role", "option");
    item.textContent = option.textContent;
    item.addEventListener("pointerdown", (event) => event.preventDefault());
    item.addEventListener("click", () => { active = index; close(true); });
    list.append(item);
    return item;
  });
  select.hidden = true;
  select.after(wrapper);
  wrapper.append(trigger, list);

  function sync() {
    value.textContent = select.options[select.selectedIndex].textContent;
    options.forEach((item, index) => item.setAttribute("aria-selected", String(index === select.selectedIndex)));
  }
  function position() {
    const field = trigger.getBoundingClientRect();
    const modal = dialog.getBoundingClientRect();
    const below = Math.min(modal.bottom, innerHeight - 12) - field.bottom - 8;
    const above = field.top - Math.max(modal.top, 12) - 8;
    const opensUp = below < 180 && above > below;
    wrapper.classList.toggle("opens-up", opensUp);
    list.style.maxHeight = `${Math.min(240, Math.max(80, opensUp ? above : below))}px`;
  }
  function highlight(index) {
    active = Math.max(0, Math.min(options.length - 1, index));
    options.forEach((item, i) => item.classList.toggle("is-active", i === active));
    trigger.setAttribute("aria-activedescendant", options[active].id);
    options[active].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }
  function open() {
    list.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    position();
    highlight(select.selectedIndex);
  }
  function close(commit = false) {
    if (list.hidden) return;
    if (commit) {
      select.selectedIndex = active;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      sync();
    }
    list.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-activedescendant");
  }
  trigger.addEventListener("click", () => list.hidden ? open() : close());
  trigger.addEventListener("keydown", (event) => {
    const wasOpen = !list.hidden;
    if (event.key === "Escape" && wasOpen) {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!wasOpen) open();
      if (event.key === "Home") highlight(0);
      else if (event.key === "End") highlight(options.length - 1);
      else if (wasOpen) highlight(active + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (wasOpen) close(true);
      else open();
    } else if (event.key === "Tab" && wasOpen) {
      close(true);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      if (!wasOpen) open();
      const now = performance.now();
      search = now - typedAt > 700 ? event.key : search + event.key;
      typedAt = now;
      const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const query = normalize(search);
      const repeated = [...query].every((letter) => letter === query[0]);
      const prefix = repeated ? query[0] : query;
      for (let offset = 1; offset <= options.length; offset++) {
        const index = (active + offset) % options.length;
        if (normalize(options[index].textContent).startsWith(prefix)) { highlight(index); break; }
      }
    }
  });
  trigger.addEventListener("blur", () => close(true));
  dialog.addEventListener("pointerdown", (event) => {
    if (!wrapper.contains(event.target)) close(true);
  }, { signal });
  dialog.addEventListener("scroll", () => { if (!list.hidden) position(); }, { signal, passive: true });
  window.addEventListener("resize", () => { if (!list.hidden) position(); }, { signal });
  sync();
}

function openContact(solution = "") {
  openDialog(
    `<span class="eyebrow">Vamos conversar</span><h2 id="dialog-title">O que gostaria<br>de proteger?</h2>${contactDetails}<p>Preencha os campos para preparar o seu email. Todos os campos são obrigatórios.</p><form id="contact-form"><label>O seu nome<input name="name" autocomplete="name" required placeholder="Como se chama?" maxlength="100"></label><label>O seu email<input type="email" name="email" autocomplete="email" required placeholder="nome@exemplo.pt" maxlength="200"></label><label>Estou interessado em<select name="solution" required><option value="">Escolha uma opção</option>${solutions.map((s) => `<option value="${s.name}" ${s.id === solution ? "selected" : ""}>${s.name}</option>`).join("")}<option>Outra questão</option></select></label><label>A sua mensagem<textarea name="message" required rows="3" placeholder="Conte-nos um pouco do que precisa." maxlength="2500"></textarea></label><p class="form-note">Ao continuar, abrimos a sua aplicação de email com a mensagem preenchida. Confirme o envio nessa aplicação. O site não guarda os dados do formulário.</p><button class="button" type="submit" disabled>Abrir aplicação de email ${arrow}</button></form>`,
  );
  styleContactSelect(document.querySelector('#contact-form select[name="solution"]'));
  const form = document.querySelector("#contact-form");
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const submit = form.querySelector('[type="submit"]');
  function updateValidity() {
    fields.forEach((field) => {
      field.setCustomValidity(field.value.trim() ? "" : "Preencha este campo.");
    });
    submit.disabled = !fields.every((field) => field.validity.valid);
  }
  form.addEventListener("input", updateValidity);
  form.addEventListener("change", updateValidity);
  updateValidity();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateValidity();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    for (const [key, value] of values) values.set(key, value.trim());
    const message = `Olá, A. Gonçalves - Seguros!\n\nO meu nome é ${values.get("name")}.\nEmail: ${values.get("email")}\nInteresse: ${values.get("solution") || "Informações gerais"}\n\n${values.get("message") || "Gostaria de saber mais sobre as vossas soluções de proteção."}`;
    const subject = `Pedido de contacto — ${values.get("solution")}`;
    const mailto = `mailto:seguros@agoncalves.com.pt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.replace(/\r?\n/g, "\r\n"))}`;
    openDialog(
      `<span class="eyebrow">A sua mensagem</span><h2 id="dialog-title">O primeiro passo<br>está preparado.</h2>${contactDetails}<p>Confirme o envio na sua aplicação de email. Se não abrir, use a ligação abaixo ou copie a mensagem e envie-a para seguros@agoncalves.com.pt.</p><p><a class="button" id="open-email">Abrir aplicação de email ${arrow}</a></p><pre class="message-preview"></pre><button class="button" id="copy-message">Copiar mensagem ${arrow}</button><p class="copy-status" role="status"></p>`,
    );
    dialogContent.querySelector(".message-preview").textContent = message;
    const emailLink = dialogContent.querySelector("#open-email");
    emailLink.href = mailto;
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
    emailLink.click();
  });
}

document.addEventListener("click", (event) => {
  const campaignButton = event.target.closest("[data-campaign]");
  if (campaignButton) {
    const campaign = campaigns.find((item) => item.id === campaignButton.dataset.campaign);
    openDialog(
      `<span class="eyebrow">Campanha ${campaign.product}</span><h2 id="dialog-title">${campaign.title}</h2><h3>Condições da campanha</h3><ul>${campaign.conditions.map((condition) => `<li>${condition}</li>`).join("")}</ul><p><a class="text-link" href="${campaign.source}" target="_blank" rel="noopener noreferrer">Consultar campanha na Zurich ${externalArrow}</a></p><p class="form-note">Sujeito às condições da campanha e à aceitação do risco pela seguradora. Consulte a informação pré-contratual e contratual aplicável.</p><button class="button" id="campaign-contact">Saber mais sobre esta campanha ${arrow}</button>`,
    );
    document.querySelector("#campaign-contact").addEventListener("click", () => openContact(campaign.solution));
  }
  const solutionButton = event.target.closest("[data-solution]");
  if (solutionButton) {
    const solution = solutions.find(
      (s) => s.id === solutionButton.dataset.solution,
    );
    openDialog(
      `<span class="eyebrow">${solution.category}</span><h2 id="dialog-title">${solution.heading}</h2>${solution.detail.map((paragraph) => `<p>${paragraph}</p>`).join("")}<h3>Vamos começar por aqui</h3><ul>${solution.questions.map((q) => `<li>${q}</li>`).join("")}</ul><p class="form-note">${solution.note}</p><button class="button" id="solution-contact">${solution.cta} ${arrow}</button>`,
    );
    document
      .querySelector("#solution-contact")
      .addEventListener("click", () => openContact(solution.id));
  }
  if (event.target.closest("[data-contact]")) openContact();
  const faqButton = event.target.closest("[data-faq]");
  if (faqButton) {
    const faq = faqs[Number(faqButton.dataset.faq)];
    openDialog(
      `<span class="eyebrow">${faq.category} · Perguntas frequentes</span><h2 id="dialog-title">${faq.title}</h2>${faq.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}<button class="button" data-contact>${faq.cta} ${arrow}</button>`,
    );
  }
  const scenarioButton = event.target.closest("[data-scenario]");
  if (scenarioButton) {
    const scenario = scenarios[Number(scenarioButton.dataset.scenario)];
    openDialog(
      `<span class="eyebrow">${scenario.category}</span><h2 id="dialog-title">${scenario.title}</h2><p>${scenario.body}</p><button class="button" data-contact>Vamos conversar ${arrow}</button>`,
    );
  }
  if (event.target.closest("[data-privacy]"))
    openDialog(`<div class="privacy-policy">
<span class="eyebrow">Privacidade</span>
<h2 id="dialog-title">Política de privacidade</h2>
<p class="form-note">Atualizada em <time datetime="2026-10-24">24 de outubro de 2026</time></p>
<p class="form-note">Versão em revisão: os campos identificados com [PlaceHolder] aguardam confirmação pela entidade responsável.</p>
<p>Esta política explica como são tratados os dados pessoais de quem visita este site ou entra em contacto com a A. Gonçalves - Seguros, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD) e da legislação nacional aplicável.</p>
<h3>1. Responsável pelo tratamento</h3>
<p>A atividade apresentada sob a designação comercial A. Gonçalves - Seguros é exercida por <strong>[PlaceHolder]</strong> — denominação legal completa da entidade responsável pelo tratamento.</p>
<p>Sede da entidade: <strong>[PlaceHolder]</strong> — morada da sede, a confirmar pela empresa.</p>
<p>Para questões de privacidade e exercício de direitos, contacte <a href="mailto:seguros@agoncalves.com.pt">seguros@agoncalves.com.pt</a>. Pode também escrever para Praça das Pocinhas, Edifício Jardim, 163, Loja H, 4620-674 Lousada, morada de contacto apresentada no site.</p>
<p>Encarregado de proteção de dados: <strong>[PlaceHolder]</strong> — confirmar se foi designado; se existir, indicar os contactos. A designação não é obrigatória para todas as entidades.</p>
<h3>2. Dados tratados e funcionamento do formulário</h3>
<p>O formulário «Vamos conversar» utiliza o nome, email, opção de interesse e mensagem que preencher para preparar um email no seu navegador. Todos os campos são necessários para continuar através do formulário; pode, em alternativa, utilizar os contactos diretos apresentados no site.</p>
<p>Ao escolher «Abrir aplicação de email», esses dados são incluídos numa ligação <em>mailto:</em> que abre a aplicação de email configurada no seu dispositivo. O envio depende da sua confirmação nessa aplicação. O site não envia o email automaticamente nem guarda o conteúdo do formulário numa base de dados.</p>
<p>Se escolher «Copiar mensagem», o texto passa para a área de transferência do dispositivo, gerida pelo respetivo sistema. Se enviar o email, a mensagem será tratada pelos serviços de email envolvidos e recebida pela empresa. Envie apenas os dados necessários ao seu pedido; evite incluir documentos de identificação, informações de saúde ou outros dados sensíveis neste primeiro contacto.</p>
<h3>3. Finalidades e fundamentos legais</h3>
<p>Os dados enviados para pedir uma proposta ou informações necessárias à contratação de um seguro são utilizados para realizar diligências pré-contratuais a seu pedido, nos termos do artigo 6.º, n.º 1, alínea b), do RGPD.</p>
<p>Os restantes pedidos de esclarecimento são tratados com base no interesse legítimo em responder às comunicações recebidas e prestar apoio, nos termos do artigo 6.º, n.º 1, alínea f), sujeito à ponderação dos seus direitos e interesses. Quando exista uma obrigação legal de conservação ou comunicação, o tratamento necessário ao seu cumprimento tem fundamento na alínea c) do mesmo artigo.</p>
<p>Este site não disponibiliza subscrições de publicidade nem toma decisões automatizadas sobre a contratação de seguros. O envio de um pedido de contacto não corresponde à subscrição de comunicações promocionais.</p>
<h3>4. Alojamento, mapas e cookies</h3>
<p>O site é alojado no GitHub Pages, que regista endereços IP para fins de segurança. Ao carregar o mapa, o navegador pede imagens ao OpenStreetMap; na vista de satélite, à Esri. Esses serviços recebem o IP e os dados técnicos necessários à ligação. O mapa não solicita a localização do seu dispositivo.</p>
<p>As fotografias, os logótipos, os tipos de letra e o código Leaflet são servidos com o site. O código do site não instala cookies de análise ou publicidade nem utiliza ferramentas de acompanhamento para esses fins.</p>
<p>«Como chegar» abre o Google Maps e as ligações às campanhas abrem o site da Zurich. Ao seguir essas ligações, aplicam-se as políticas dos respetivos serviços.</p>
<h3>5. Destinatários e transferências internacionais</h3>
<p>O tratamento dos pedidos pode envolver as pessoas autorizadas a responder e os prestadores necessários ao funcionamento do email. Prestador do serviço de email da empresa: <strong>[PlaceHolder]</strong> — identificar o fornecedor e a respetiva política de privacidade.</p>
<p>Outros destinatários ou categorias de destinatários dos pedidos, se aplicável: <strong>[PlaceHolder]</strong> — confirmar os acessos internos, prestadores e eventuais comunicações a seguradoras. A informação específica sobre o tratamento associado a uma proposta ou contrato deve identificar a respetiva seguradora e os destinatários aplicáveis.</p>
<p>O GitHub e os fornecedores de mapas podem tratar dados fora do Espaço Económico Europeu. Consulte as políticas do <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub</a>, da <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">OpenStreetMap Foundation</a> e da <a href="https://www.esri.com/en-us/privacy/privacy-statements/privacy-statement" target="_blank" rel="noopener noreferrer">Esri</a>.</p>
<p>Transferências internacionais e garantias aplicáveis aos serviços contratados pela empresa: <strong>[PlaceHolder]</strong> — confirmar países ou situações de transferência e o mecanismo aplicável, quando necessário, incluindo como obter informação sobre essas garantias.</p>
<h3>6. Conservação dos dados</h3>
<p>O site não conserva os dados preenchidos no formulário. Os dados enviados por email podem ser conservados para tratar o pedido, cumprir obrigações legais ou exercer e defender direitos, pelo período adequado a cada finalidade.</p>
<p>Pedidos de contacto sem contratação: <strong>[PlaceHolder]</strong> — indicar o prazo ou os critérios concretos de conservação e o momento a partir do qual são contados.</p>
<p>Pedidos que dão origem a propostas ou contratos: <strong>[PlaceHolder]</strong> — indicar os prazos ou critérios aplicáveis, incluindo as obrigações legais relevantes e a informação específica a fornecer ao cliente.</p>
<h3>7. Proteção e acesso aos dados</h3>
<p>Medidas de segurança e regras de acesso aplicadas pela empresa aos emails e pedidos recebidos: <strong>[PlaceHolder]</strong> — descrever as medidas efetivamente implementadas, de forma adequada e sem divulgar pormenores que comprometam a segurança.</p>
<h3>8. Os seus direitos</h3>
<p>Nos termos e limites previstos no RGPD, pode solicitar acesso, retificação, apagamento, limitação do tratamento ou portabilidade dos seus dados, bem como opor-se a tratamentos baseados no interesse legítimo. Se algum tratamento depender do seu consentimento, pode retirá-lo a qualquer momento, sem afetar a licitude do tratamento anterior.</p>
<p>Envie o pedido para <a href="mailto:seguros@agoncalves.com.pt">seguros@agoncalves.com.pt</a>. A resposta deve ser prestada sem demora injustificada e, em regra, no prazo de um mês. Quando a complexidade ou o número de pedidos justificar uma prorrogação, será informado dentro desse prazo, nos termos do RGPD. Para confirmar a sua identidade, apenas deve ser solicitada a informação necessária.</p>
<p>Pode apresentar uma reclamação à <a href="https://www.cnpd.pt/cidadaos/participacoes/" target="_blank" rel="noopener noreferrer">Comissão Nacional de Proteção de Dados (CNPD)</a>, sem prejuízo de outros meios de recurso.</p>
<h3>9. Alterações a esta política</h3>
<p>Esta política será atualizada quando se alterarem os tratamentos, os fornecedores ou as funcionalidades do site. A data da versão encontra-se no início do documento. A eventual ativação de envio direto pelo formulário, ferramentas de análise ou publicidade exige uma avaliação prévia e a atualização da informação aplicável.</p>
</div>`);
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
        ?"Mapa disponível."
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
          ?"Vista de satélite selecionada."
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
