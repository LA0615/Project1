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