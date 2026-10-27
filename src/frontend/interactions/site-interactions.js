export function initializeSite({ language, locale, t, renderText, contactConfig }) {

// Content for the interactive insurance and FAQ dialogs. The homepage is rendered by src/frontend/components/Homepage.jsx.
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.4"/></svg>';

const externalArrow =
  '<svg class="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

const solutions = locale.solutions;

const faqs = locale.faqs;

const scenarios = locale.scenarios;

// Official Zurich Portugal offers, checked on 23 October 2026.
const campaigns = locale.campaigns;

document.querySelector(".insurers-strip").classList.add("is-ready");

const navigation = document.querySelector("#navigation");
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", t("openMenu"));
  document.body.classList.remove("menu-open");
};
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ?t("closeMenu") : t("openMenu"));
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
          t("pageLabel", { page: index + 1, count: pageCount, label: categories.join(", ") }),
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
      t("campaignStatus", { page: page + 1, count: pageCount, first: currentSlide + 1, last: Math.min(currentSlide + count, slides.length), total: slides.length });
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
  controls.setAttribute("aria-label", t("pages", { label }));
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
    dot.setAttribute("aria-label", t("pageLabel", { page: index + 1, count: items.length, label: item.querySelector("h3").textContent }));
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
      track.setAttribute("aria-roledescription", t("carousel"));
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
    if (announce && mobile.matches) status.textContent = t("pageStatus", { page: page + 1, count: items.length });
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
setupMobileCardCarousel(document.querySelector(".showcase-grid"), t("riskPages"));
setupMobileCardCarousel(document.querySelector(".blog-grid"), t("faqPages"));

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
let disposeContactForm = () => {};
function openDialog(content) {
  disposeContactSelect();
  disposeContactForm();
  disposeContactForm = () => {};
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
  disposeContactForm();
  disposeContactForm = () => {};
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

const contactDetails = `<div class="dialog-phones" role="group" aria-label="${t("contacts")}"><p>${t("talk")}</p>${[...document.querySelectorAll(".footer-contacts .phone-link, .footer-contacts .email-link")].map((link) => link.outerHTML).join("")}</div>`;

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
  trigger.setAttribute("aria-label", t("interest"));
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
  list.setAttribute("aria-label", t("insuranceType"));
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

const contactSettingsPromise = (async () => {
  const endpoint = contactConfig?.endpoint;
  if (contactConfig?.enabled !== true || !endpoint) return null;
  try {
    const url = new URL(endpoint, location.href);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    const response = await fetch(url, { credentials: "omit", signal: AbortSignal.timeout(3000) });
    if (!response.ok) return null;
    const settings = await response.json();
    return settings.enabled === true && typeof settings.siteKey === "string" && settings.siteKey
      ? { endpoint: url.href, siteKey: settings.siteKey } : null;
  } catch { return null; }
})();
let turnstileLoading;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileLoading) return turnstileLoading;
  turnstileLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const timeout = setTimeout(failed, 10000);
    function failed() {
      clearTimeout(timeout);
      script.remove();
      turnstileLoading = null;
      reject(new Error("verification_unavailable"));
    }
    script.onerror = failed;
    script.onload = () => {
      clearTimeout(timeout);
      if (window.turnstile) resolve(window.turnstile);
      else failed();
    };
    document.head.append(script);
  });
  return turnstileLoading;
}

async function openContact(solution = "") {
  const settings = await contactSettingsPromise;
  openDialog(renderText("contactSend", {
    contactIntro: settings ? t("contactIntro") : t("sendUnavailable"),
    contacts: contactDetails,
    options: solutions.map((s) => `<option value="${s.id}" ${s.id === solution ? "selected" : ""}>${s.name}</option>`).join(""),
    arrow,
  }));
  styleContactSelect(document.querySelector('#contact-form select[name="solution"]'));
  const form = document.querySelector("#contact-form");
  const fields = [...form.querySelectorAll("[required]")];
  const submit = form.querySelector('[type="submit"]');
  const status = form.querySelector(".form-status");
  let busy = false;
  let sendError = "";
  let token = "";
  let widget;
  let requestId = crypto.randomUUID();
  let lastPayload = "";
  function updateValidity() {
    fields.forEach((field) => field.setCustomValidity(field.value.trim() ? "" : t("required")));
    submit.disabled = !settings || busy || !fields.every((field) => field.validity.valid) || !token;
  }
  form.addEventListener("input", updateValidity);
  form.addEventListener("change", updateValidity);
  updateValidity();
  if (settings) {
    status.textContent = t("verificationLoading");
    loadTurnstile().then((turnstile) => {
      if (!form.isConnected || !dialog.open) return;
      status.textContent = "";
      widget = turnstile.render(form.querySelector(".contact-verification"), {
        sitekey: settings.siteKey, action: "contact", language: language,
        theme: "light", size: form.querySelector(".contact-verification").getBoundingClientRect().width < 300 ? "compact" : "flexible", "response-field": false,
        callback: (value) => { token = value; status.textContent = sendError; updateValidity(); },
        "expired-callback": () => { token = ""; status.textContent = t("verificationExpired"); updateValidity(); },
        "error-callback": () => { token = ""; status.textContent = t("verificationFailed"); updateValidity(); },
      });
    }).catch(() => { if (form.isConnected) status.textContent = t("verificationFailed"); });
    disposeContactForm = () => { if (widget !== undefined && window.turnstile) window.turnstile.remove(widget); };
  }
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy) return;
    updateValidity();
    if (!form.reportValidity() || submit.disabled) return;
    const values = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(values)) values[key] = values[key].trim();
    const payload = { ...values, language: language };
    const fingerprint = JSON.stringify(payload);
    if (lastPayload && fingerprint !== lastPayload) requestId = crypto.randomUUID();
    lastPayload = fingerprint;
    busy = true;
    sendError = "";
    status.textContent = "";
    form.setAttribute("aria-busy", "true");
    form.querySelectorAll("input, select, textarea, button").forEach((field) => field.disabled = true);
    submit.textContent = t("sending");
    try {
      const response = await fetch(settings.endpoint, {
        method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, token, requestId }), signal: AbortSignal.timeout(18000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) throw new Error(result.error || "delivery_unavailable");
      if (form.isConnected && dialog.open) openDialog(renderText("contactSuccess", { contacts: contactDetails }));
    } catch (error) {
      if (form.isConnected && dialog.open) {
        sendError = error.message === "verification_failed" ? t("verificationFailed") : t("sendFailed");
        status.textContent = sendError;
      }
    } finally {
      busy = false;
      token = "";
      if (form.isConnected) {
        form.removeAttribute("aria-busy");
        form.querySelectorAll("input, select, textarea, button").forEach((field) => field.disabled = false);
        submit.innerHTML = `${t("sendMessage")} ${arrow}`;
        if (widget !== undefined && window.turnstile) window.turnstile.reset(widget);
        updateValidity();
      }
    }
  });
}

// Business-specific fields remain explicit until confirmed by the owner.
const legalDocuments = locale.legal;

function openLegalDocument(key) {
  const document = legalDocuments[key];
  if (!document) return;
  openDialog(renderText("legal", { title: document.title, body: document.body }));
}

document.addEventListener("click", (event) => {
  const legalButton = event.target.closest("[data-legal]");
  if (legalButton) openLegalDocument(legalButton.dataset.legal);
  const campaignButton = event.target.closest("[data-campaign]");
  if (campaignButton) {
    const campaign = campaigns.find((item) => item.id === campaignButton.dataset.campaign);
    openDialog(
      renderText("campaign", { ...campaign, conditions: campaign.conditions.map((condition) => `<li>${condition}</li>`).join(""), arrow, externalArrow }),
    );
    document.querySelector("#campaign-contact").addEventListener("click", () => openContact(campaign.solution));
  }
  const solutionButton = event.target.closest("[data-solution]");
  if (solutionButton) {
    const solution = solutions.find(
      (s) => s.id === solutionButton.dataset.solution,
    );
    openDialog(
      renderText("solution", { ...solution, paragraphs: solution.detail.map((paragraph) => `<p>${paragraph}</p>`).join(""), questions: solution.questions.map((q) => `<li>${q}</li>`).join(""), arrow }),
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
      renderText("faq", { ...faq, paragraphs: faq.body.map((paragraph) => `<p>${paragraph}</p>`).join(""), arrow }),
    );
  }
  const scenarioButton = event.target.closest("[data-scenario]");
  if (scenarioButton) {
    const scenario = scenarios[Number(scenarioButton.dataset.scenario)];
    openDialog(
      renderText("scenario", { ...scenario, arrow }),
    );
  }
  if (event.target.closest("[data-privacy]"))
    openDialog(locale.privacy);
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

async function initializeOfficeMap() {
  if (!window.L) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/assets/vendor/leaflet/leaflet.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      });
    } catch { /* The address and directions remain available if the map fails. */ }
  }
  if (!window.L || location.protocol === "file:") {
    mapStatus.textContent =
      t("mapUnavailable");
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
        ?t("mapReady")
        : t("mapFailed");
      mapStatus.classList.toggle("sr-only", loadedTiles > 0);
    });
  }

  layers.street.addTo(map);
  const pin = L.divIcon({
    className: "office-marker",
    html: '<span class="office-pin"><img src="/assets/brand/logo-white.svg" alt="" /></span>',
    iconSize: [56, 68],
    iconAnchor: [28, 64],
    tooltipAnchor: [0, -68],
  });
  L.marker(officeLocation, {
    icon: pin,
    title: t("pinTitle"),
    alt: t("pinAlt"),
    keyboard: true,
  })
    .addTo(map)
    .bindTooltip(t("pinTooltip"), {
      permanent: true,
      direction: "top",
      className: "office-map-label",
      offset: [0, -4],
    })
    .bindPopup(
      t("pinPopup"),
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
          ?t("satelliteSelected")
          : t("streetSelected");
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


const picker = document.querySelector(".language-picker");
const summary = picker.querySelector("summary");
picker.querySelectorAll("[data-language]").forEach((link) => {
  function updateURL() {
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    url.pathname = link.dataset.language === "pt" ? "/" : "/en";
    link.href = url.href;
  }
  updateURL();
  link.addEventListener("pointerdown", updateURL);
  window.addEventListener("hashchange", updateURL);
});
document.addEventListener("click", (event) => {
  if (!picker.contains(event.target)) picker.open = false;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && picker.open) {
    picker.open = false;
    summary.focus();
  }
});

}
