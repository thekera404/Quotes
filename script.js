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

// Function to get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Simulate loading state for 1 second
  newQuoteBtn.classList.add("loading");
  newQuoteBtn.innerText = "Loading...";
  
  setTimeout(() => {
    // Update the quote and author
    quoteText.innerText = `"${selectedQuote.text}"`;
    authorName.innerText = selectedQuote.author;

    // Reset button state
    newQuoteBtn.classList.remove("loading");
    newQuoteBtn.innerText = "New Quote";
  }, 1000); // 1 second delay
}

// Event listener for "New Quote" button
newQuoteBtn.addEventListener("click", getRandomQuote);

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
