// Function to fetch quotes data
function getQuotes() {
    var apiUrl = "https://type.fit/api/quotes";
   
   
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
   
   
   // Function to display quotes
   function displayQuotesData(quotesData) {
    var quotesDisplay = document.getElementById("quotesDisplay");
    quotesDisplay.innerHTML = "";
   
   
    // Loop through the quotes and create elements for each quote
    for (var i = 0; i < quotesData.length; i++) {
      var quoteElement = document.createElement("p");
      quoteElement.textContent = quotesData[i].text;
      // Append the quote element to the quotes display
      quotesDisplay.appendChild(quoteElement);
    }
   
   
    console.log("Quotes displayed:", quotesData);
   }
   // Add event listener to the getQuotes button
var getQuotesButton = document.querySelector(".getQuotes");
getQuotesButton.addEventListener("click", getQuotes);

const API_KEY = "bYHHxHBU513WV5IZp3wKNSVkKBwhu8qx";

document.addEventListener("DOMContentLoaded", init);
function init() {
  var searchBtn = document.querySelector(".search-button");
  searchBtn.addEventListener("click", ev => {
    ev.preventDefault();
      let url = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&limit=6&q=`;
      let searchInput = document.querySelector(".search-input");
      let str = searchInput.value.trim();
      url = url.concat(str);
      console.log(url);
  })
}

