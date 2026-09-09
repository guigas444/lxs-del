// Índice — interações do site
// 1) Menu mobile
// 2) Abas "Rastreamento / Indexação / Classificação"
// 3) Busca ao vivo nos cards de serviço
// 4) Envio do formulário de contato (sem backend, apenas confirmação visual)

document.addEventListener("DOMContentLoaded", function () {
  setupNavToggle();
  setupTabs();
  setupServiceSearch();
  setupContactForm();
});

function setupNavToggle() {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil em telas pequenas)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupTabs() {
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  if (!tabButtons.length) return;

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateTab(btn.dataset.tab);
    });
  });

  function activateTab(name) {
    tabButtons.forEach(function (btn) {
      var isActive = btn.dataset.tab === name;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll(".tab-panel").forEach(function (panel) {
      var isActive = panel.id === "painel-" + name;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  }
}

function setupServiceSearch() {
  var input = document.getElementById("serviceSearch");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".index-card"));
  var noResults = document.getElementById("noResults");
  if (!input || !cards.length) return;

  input.addEventListener("input", function () {
    var query = input.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var haystack = (card.dataset.keywords + " " + card.textContent).toLowerCase();
      var matches = haystack.indexOf(query) !== -1;
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  });
}

function setupContactForm() {
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var nome = form.nome.value.trim();

    status.hidden = false;
    status.textContent = "Recebido, " + nome + ". Vamos analisar seu site e responder em até um dia útil.";
    form.reset();
  });
}
