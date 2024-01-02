// Function to fetch quotes data
function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayQuotesData(data);
    })
    .catch(function (error) {
      console.error("Error fetching quotes data:", error);
    });
}

// Function to display Random quote
function displayQuotesData(quotesData) {
  const quotesDisplay = document.querySelector(".quotesDisplay");
  quotesDisplay.innerHTML = ""; //clear existing content

  // Randomly select a quote from the fetched data
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  const selectedQuote = quotesData[randomIndex];

  // Create an element for the selected quote
  const quoteElement = document.createElement("p");
  quoteElement.textContent = selectedQuote.text;

  // Append the quote element to the quotes display
  quotesDisplay.appendChild(quoteElement);
  
  console.log("Quotes displayed:", quotesData);
}
// Add event listener to the getQuotes button
let getQuotesButton = document.querySelector(".getQuotes");
getQuotesButton.addEventListener("click", getQuotes);

const API_KEY = "bYHHxHBU513WV5IZp3wKNSVkKBwhu8qx";

document.addEventListener("DOMContentLoaded", init);
function init() {
  var searchBtn = document.querySelector(".search-button");
  searchBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&limit=6&q=`;
    let searchInput = document.querySelector(".search-input");
    let str = searchInput.value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        //data pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fc.textContent = content.data[0].title;
        fig.appendChild(img);
        fig.appendChild(fc);
        let out = document.querySelector(".results");
        out.insertAdjacentElement("afterbegin", fig);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
