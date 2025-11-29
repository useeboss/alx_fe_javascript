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

function notifyUser(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.background = "#f0f0f0";
  notification.style.padding = "10px";
  notification.style.marginTop = "10px";
  notification.style.border = "1px solid #ccc";

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => notification.remove(), 5000);
}


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

// ====== Populate Categories Dynamically ======
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options except "All"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Extract unique categories
  const categories = [...new Set(quotes.map(q => q.category))];

  // Populate dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const savedFilter = localStorage.getItem("dqg_selected_category");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
    filterQuotes(); // Apply saved filter immediately
  }
}

// ====== Filter Quotes Based on Selected Category ======
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;

  // Save selected category to localStorage
  localStorage.setItem("dqg_selected_category", selectedCategory);

  // Filter quotes
  let filteredQuotes = quotes;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  // Display filtered quotes
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
    return;
  }

  // Show all filtered quotes (instead of random)
  quoteDisplay.innerHTML = filteredQuotes
    .map(q => `<p>"${q.text}" — <em>${q.category}</em></p>`)
    .join("");
}

// ====== Update Add Quote to Refresh Categories ======
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // persist to localStorage
    quoteDisplay.innerHTML = `<p>New quote added: "${text}" — <em>${category}</em></p>`;
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Refresh categories in dropdown
    populateCategories();
  } else {
    quoteDisplay.innerHTML = "<p style='color:red;'>Please enter both quote and category.</p>";
  }
}

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Simulate fetching quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    // Map server data into quote format
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

// Simulate posting new quote to server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify(quote),
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    console.log("Posted to server:", result);
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: server overwrites duplicates
  const mergedQuotes = [...quotes];

  serverQuotes.forEach(serverQuote => {
    const exists = mergedQuotes.some(q => q.text === serverQuote.text);
    if (!exists) {
      mergedQuotes.push(serverQuote);
    } else {
      // Replace local with server version
      const index = mergedQuotes.findIndex(q => q.text === serverQuote.text);
      mergedQuotes[index] = serverQuote;
    }
  });

  quotes = mergedQuotes;
  saveQuotes(); // persist to localStorage

  // Notify user
  notifyUser("Quotes synced with server. Conflicts resolved using server data.");
}

// Run sync every 30 seconds
setInterval(syncQuotes, 30000);


// ====== Init ======
(function init() {
  loadQuotes();
  loadLastViewed();
  newQuoteBtn.addEventListener("click", displayRandomQuote);
  exportBtn.addEventListener("click", exportToJson);
  populateCategories(); // Populate categories on load
})();
