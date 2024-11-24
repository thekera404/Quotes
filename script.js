// Selecting necessary elements
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author");
const newQuoteBtn = document.querySelector("#newQuote");
const copyQuoteBtn = document.querySelector("#copyQuote");
const twitterShareBtn = document.querySelector("#twitterShare");

// List of quotes
const quotes = [
  { text: "Today is a good day to build on @Base", author: "-- thekera404 --" },
  { text: "It's still day one, let's keep on building together", author: "-- thekera404 --" },
  { text: "It's a good Sunday to build on @Base", author: "-- thekera404 --" }
];

// Current quote index
let currentIndex = 0;

// Function to get the next quote in sequence
function getNextQuote(isInitial = false) {
  if (quotes.length === 0) {
    alert("No quotes available!");
    return;
  }

  if (!isInitial) {
    // Show loading state only when triggered by the button
    newQuoteBtn.innerText = "Loading...";
    newQuoteBtn.disabled = true;
  }

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
  }, isInitial ? 0 : 1000); // Skip delay for initial load
}

// Event listener for "New Quote" button
newQuoteBtn.addEventListener("click", () => getNextQuote(false));

// Event listener for "Copy Quote" button
copyQuoteBtn.addEventListener("click", () => {
  const quote = quoteText.innerText;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(quote).then(() => {
      alert("Quote copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy quote:", err);
      alert("Failed to copy quote.");
    });
  } else {
    // Fallback for unsupported browsers
    const textArea = document.createElement("textarea");
    textArea.value = quote;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Quote copied to clipboard!");
    } catch (err) {
      console.error("Fallback: Could not copy quote:", err);
      alert("Could not copy quote.");
    }
    document.body.removeChild(textArea);
  }
});

// Event listener for "Twitter Share" button
twitterShareBtn.addEventListener("click", () => {
  const tweetText = quoteText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
});

// Load the first quote when the page loads
getNextQuote(true);
