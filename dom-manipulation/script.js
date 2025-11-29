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
