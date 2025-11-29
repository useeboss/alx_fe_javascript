// Initial quotes array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerText = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerText = `"${quote.text}" — ${quote.category}`;
}

// Create form to add new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.innerText = "Add Quote";
  addBtn.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addBtn);

  document.body.appendChild(formContainer);
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

// Initialize
newQuoteBtn.addEventListener("click", showRandomQuote);
createAddQuoteForm();

function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}" — <em>${quote.category}</em></p>`;
}

function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  // 1. Generate a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);

  // 2. Select the quote object
  const quote = quotes[randomIndex];

  // 3. Update the DOM
  quoteDisplay.innerHTML = `<p>"${quote.text}" — <em>${quote.category}</em></p>`;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    // 1. Add new quote to the array
    quotes.push({ text, category });

    // 2. Update the DOM with confirmation
    alert("Quote added successfully!");

    // 3. Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    // Handle empty input
    alert("Please enter both quote and category.");
  }
}

function addQuote() {
  // 1. Get values from input fields
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  // 2. Validate inputs
  if (text && category) {
    // 3. Add new quote object to the quotes array
    quotes.push({ text, category });

    // 4. Update the DOM to confirm addition
    quoteDisplay.innerHTML = `<p>New quote added: "${text}" — <em>${category}</em></p>`;

    // 5. Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    // Handle empty input case
    quoteDisplay.innerHTML = "<p style='color:red;'>Please enter both quote and category.</p>";
  }
}

function addQuote() {
  // 1. Get values from input fields
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  // 2. Validate inputs
  if (text && category) {
    // 3. Add new quote object to the quotes array
    quotes.push({ text, category });

    // 4. Update the DOM to confirm addition
    quoteDisplay.innerHTML = `<p>New quote added: "${text}" — <em>${category}</em></p>`;

    // 5. Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    // Handle empty input case
    quoteDisplay.innerHTML = "<p style='color:red;'>Please enter both quote and category.</p>";
  }
}

// Get reference to the button
const newQuoteBtn = document.getElementById("newQuote");

// Attach event listener
newQuoteBtn.addEventListener("click", displayRandomQuote);

// ====== Storage Helpers ======
const LS_KEY = "dqg_quotes";
const SS_KEY_LAST = "dqg_last_viewed";

// Load quotes from localStorage on init
function loadQuotes() {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        quotes = parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load quotes:", e);
  }
}

// Save quotes to localStorage
function saveQuotes() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(quotes));
  } catch (e) {
    console.warn("Failed to save quotes:", e);
  }
}

// Update sessionStorage with last viewed quote
function saveLastViewed(quote) {
  try {
    sessionStorage.setItem(SS_KEY_LAST, JSON.stringify(quote));
    const lastViewedDiv = document.getElementById("lastViewed");
    lastViewedDiv.innerHTML = `<small>Last viewed: "${quote.text}" — <em>${quote.category}</em></small>`;
  } catch (e) {
    console.warn("Failed to save last viewed:", e);
  }
}

function loadLastViewed() {
  try {
    const data = sessionStorage.getItem(SS_KEY_LAST);
    if (data) {
      const quote = JSON.parse(data);
      const lastViewedDiv = document.getElementById("lastViewed");
      lastViewedDiv.innerHTML = `<small>Last viewed: "${quote.text}" — <em>${quote.category}</em></small>`;
    }
  } catch (e) {
    console.warn("Failed to load last viewed:", e);
  }
}

// ====== Existing Elements ======
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportJson");

// ====== Display Random Quote (uses innerHTML) ======
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

// ====== Add Quote and persist to localStorage ======
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // persist
    quoteDisplay.innerHTML = `<p>New quote added: "${text}" — <em>${category}</em></p>`;
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    quoteDisplay.innerHTML = "<p style='color:red;'>Please enter both quote and category.</p>";
  }
}

// ====== Export Quotes as JSON ======
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

// ====== Import Quotes from JSON (file input onchange calls this) ======
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        // Optional: validate items have text & category
        const valid = imported.filter(
          (q) => q && typeof q.text === "string" && typeof q.category === "string"
        );
        quotes.push(...valid);
        saveQuotes();
        alert(`Quotes imported successfully! (${valid.length} added)`);
      } else {
        alert("Invalid JSON format: expected an array of quotes.");
      }
    } catch (err) {
      alert("Failed to parse JSON file.");
      console.error(err);
    } finally {
      event.target.value = ""; // reset file input
    }
  };
  reader.readAsText(file);
}

// ====== Init ======
(function init() {
  // Ensure quotes exists (in case this file loads before declaration)
  if (typeof quotes === "undefined") {
    window.quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
    ];
  }

  loadQuotes();      // populate from localStorage if present
  loadLastViewed();  // show last viewed (sessionStorage)

  newQuoteBtn.addEventListener("click", displayRandomQuote);
  exportBtn.addEventListener("click", exportToJson);
})();
