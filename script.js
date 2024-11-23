// Selecting the necessary elements
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector("#newQuote");
const twitterBtn = document.getElementById("twitterShare");

// Function to fetch a new quote
function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  
  // Fetching random quote data from API
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content; // Set the new quote text
      authorName.innerText = result.author; // Update the author name
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
      
      // Trigger the Twitter share automatically when a new quote is fetched
      twitterShare(result.content);
    });
}

// Function to share the quote on Twitter
function twitterShare(quote) {
  const tweetText = quote;  // Share only the quote text
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
}

// Event listeners
quoteBtn.addEventListener("click", randomQuote);

// Optional: Share button to manually trigger Twitter share
twitterBtn.addEventListener("click", () => {
  const tweetText = quoteText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
});
