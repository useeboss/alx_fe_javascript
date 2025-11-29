// Initial quotes array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportJson");

// ====== Storage Helpers ======
const LS_KEY = "dqg_quotes";
const SS_KEY_LAST = "dqg_last_viewed";

function loadQuotes() {
  const data = localStorage.getItem(LS_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) quotes = parsed;
  }
}

function saveQuotes() {
  localStorage.setItem(LS_KEY, JSON.stringify(quotes));
}

function saveLastViewed(quote) {
  sessionStorage.setItem(SS_KEY_LAST, JSON.stringify(quote));
  document.getElementById("lastViewed").innerHTML =
    `<small>Last viewed: "${quote.text}" — <em>${quote.category}</em></small>`;
}

function loadLastViewed() {
  const data = sessionStorage.getItem(SS_KEY_LAST);
  if (data) {
    const quote = JSON.parse(data);
    document.getElementById("lastViewed").innerHTML =
      `<small>Last viewed: "${quote.text}" — <em>${quote.category}</em></small>`;
  }
}

// ====== Display Random Quote ======
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}" — <em>${quote.category}</em></p>`;
  saveLastViewed(quote);
}

// ====== Add Quote ======
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    quoteDisplay.innerHTML = `<p>New quote added: "${text}" — <em>${category}</em></p>`;
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    quoteDisplay.innerHTML = "<p style='color:red;'>Please enter both quote and category.</p>";
  }
}

// ====== Export Quotes ======
function exportToJson() {
  const json = JSON.stringify(quotes, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ====== Import Quotes ======
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        const valid = imported.filter(q => q.text && q.category);
        quotes.push(...valid);
        saveQuotes();
        alert(`Quotes imported successfully! (${valid.length} added)`);
      } else {
        alert("Invalid JSON format: expected an array of quotes.");
      }
    } catch {
      alert("Failed to parse JSON file.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

// ====== Init ======
(function init() {
  loadQuotes();
  loadLastViewed();
  newQuoteBtn.addEventListener("click", displayRandomQuote);
  exportBtn.addEventListener("click", exportToJson);
})();
