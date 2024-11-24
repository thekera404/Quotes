// Selecting necessary elements
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author");
const newQuoteBtn = document.querySelector("#newQuote");
const copyQuoteBtn = document.querySelector("#copyQuote");
const twitterShareBtn = document.querySelector("#twitterShare");

// List of quotes
const quotes = [
  { text: "Today is a good day to build on @Base", author: "-- thekera404 --" },
  { text: "It's still day one, let's keep on building together", author: "-- thekera404 --" }
];

// Current quote index
let currentIndex = 0;

// Function to get the next quote in sequence
function getNextQuote() {
  // Show loading state
  newQuoteBtn.innerText = "Loading...";
  newQuoteBtn.disabled = true;

  setTimeout(() => {
    // Cycle to the next quote
    currentIndex = (currentIndex + 1) % quotes.length;
    const selectedQuote = quotes[currentIndex];

    // Update the quote and author text
    quoteText.innerText = `"${selectedQuote.text}"`;
    authorName.innerText = selectedQuote.author;

    // Reset the button state
    newQuoteBtn.innerText = "New Quote";
    newQuoteBtn.disabled = false;
  }, 1000);
}

// Event listener for "New Quote" button
newQuoteBtn.addEventListener("click", getNextQuote);

// Event listener for "Copy Quote" button
copyQuoteBtn.addEventListener("click", () => {
  const quote = quoteText.innerText;
  navigator.clipboard.writeText(quote);
  alert("Quote copied to clipboard!");
});

// Event listener for "Twitter Share" button
twitterShareBtn.addEventListener("click", () => {
  const tweetText = quoteText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
});

// Load the first quote when the page loads
getNextQuote();
