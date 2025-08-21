import { init } from "https://esm.sh/@farcaster/frame-sdk";

interface Quote {
  text: string;
  author: string;
}

// DOM Elements
const quoteText = document.querySelector<HTMLParagraphElement>(".quote")!;
const authorName = document.querySelector<HTMLDivElement>(".author")!;
const newQuoteBtn = document.querySelector<HTMLButtonElement>("#newQuote")!;
const copyQuoteBtn = document.querySelector<HTMLButtonElement>("#copyQuote")!;
const shareCastBtn = document.querySelector<HTMLButtonElement>("#shareCast")!;
const saveQuoteBtn = document.querySelector<HTMLButtonElement>("#saveQuote")!;
const quoteInput = document.querySelector<HTMLInputElement>("#quoteInput")!;
const authorInput = document.querySelector<HTMLInputElement>("#authorInput")!;
const savedQuotesList = document.querySelector<HTMLUListElement>("#savedQuotes")!;

// Quotes
let quotes: Quote[] = [
  { text: "Today is a good day to build on @Base", author: "-- thekera404 --" },
  { text: "It's still day one, let's keep on building together", author: "-- thekera404 --" },
  { text: "It's a good Sunday to build on @Base", author: "-- thekera404 --" }
];

// Load saved quotes from localStorage
function loadSavedQuotes(): void {
  const saved = localStorage.getItem("savedQuotes");
  if (saved) {
    const parsed: Quote[] = JSON.parse(saved);
    parsed.forEach(addSavedQuote);
  }
}

// Save a new quote to localStorage
function saveQuoteToStorage(quote: Quote): void {
  const saved = localStorage.getItem("savedQuotes");
  const savedQuotes: Quote[] = saved ? JSON.parse(saved) : [];
  if (!savedQuotes.some(q => q.text === quote.text && q.author === quote.author)) {
    savedQuotes.push(quote);
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
    addSavedQuote(quote);
  } else {
    alert("Quote already saved!");
  }
}

// Add saved quote to DOM
function addSavedQuote(quote: Quote): void {
  const li = document.createElement("li");
  li.innerText = `"${quote.text}" ${quote.author}`;
  savedQuotesList.appendChild(li);
}

// Random quote
function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Display quote
function displayQuote(): void {
  const selected = getRandomQuote();
  quoteText.innerText = `"${selected.text}"`;
  authorName.innerText = selected.author;
}

// Copy to clipboard
copyQuoteBtn.addEventListener("click", () => {
  const text = `${quoteText.innerText} ${authorName.innerText}`;
  navigator.clipboard.writeText(text)
    .then(() => alert("Quote copied!"))
    .catch(() => alert("Failed to copy."));
});

// New quote
newQuoteBtn.addEventListener("click", displayQuote);

// Save quote
saveQuoteBtn.addEventListener("click", () => {
  const text = quoteInput.value.trim();
  const author = authorInput.value.trim() || "Anonymous";
  if (text) {
    const quote: Quote = { text, author };
    saveQuoteToStorage(quote);
    quoteInput.value = "";
    authorInput.value = "";
  } else {
    alert("Please enter a quote.");
  }
});

// Farcaster share
(async () => {
  try {
    const { actions, ready } = await init();
    shareCastBtn.addEventListener("click", () => {
      const castText = `${quoteText.innerText} ${authorName.innerText} #QuotesApp`;
      actions.composeCast({ text: castText });
    });
    ready();
  } catch (err) {
    console.error("Farcaster SDK failed to load:", err);
  }
})();

// Initialize
loadSavedQuotes();
displayQuote();
