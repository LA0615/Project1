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

  // Save the quote to local storage
  saveQuoteToLocalStorage(selectedQuote.text);

  console.log("Quotes displayed:", quotesData);
}
// Function to save a quote to local storage
function saveQuoteToLocalStorage(quote) {
  // Check if there is an existing quote history in local storage
  const existingQuotes = JSON.parse(localStorage.getItem("quoteHistory")) || [];

  // Add the new quote to the array
  existingQuotes.push(quote);

  // Save the updated quote history to local storage
  localStorage.setItem("quoteHistory", JSON.stringify(existingQuotes));
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
        for (var i = 0; i < content.data.length; i++) {
          //data pagination, meta
          console.log(content.data);
          console.log("META", content.meta);
          let containResults = document.getElementById("containResults");
          let fig = document.createElement("figure");
          let img = document.createElement("img");
          img.src = content.data[i].images.downsized.url;
          img.alt = content.data[i].title;
          fig.appendChild(img);
          img.setAttribute("class", "draggable");
          let out = document.querySelector(".results");
          out.insertAdjacentElement("afterbegin", fig);
          containResults.appendChild(out);

          // Draggable and droppable function
          $(function () {
            const visionBoard = document.getElementById("board-box");

            $(".draggable").draggable({
              // revert: 'invalid',
              cursor: "move",
            });
            $(visionBoard).droppable({
              accept: ".draggable",
              // classes: {
              //   "ui-droppable-active": "ui-state-highlight",
              // },
              drop: function (event, ui) {
                addItem(ui.draggable);
                // const droppedElement = ui.draggable;
              },
            });
            function addItem( $item ) {
              $item.fadeOut(function() {
                const $list = $( "ul", visionBoard ).length ?
                  $( "ul", visionBoard ) :
                  $( "<ul class='draggable'/>" ).appendTo( visionBoard );
         
                
                $item.appendTo( $list ).fadeIn(function() {
                  $item
                    .animate({ width: content.data[i].images.downsized.url })
                    .find( "img" )
                      .animate({ height: "36px" });
                });
              });
            }
              
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function clearSearchResults() {
  let resultsContainer = document.querySelector(".results");
  resultsContainer.innerHTML = "";
}

var clearResults = document.getElementById("clear");
clearResults.addEventListener("click", clearSearchResults);

const titleBtn = document.getElementById("title-button");
const titlePlaceholder = document.getElementById("title-placeholder");
const titleInput = document.querySelector(".vision-board-title");
// Adds event listener to "add your title" button
titleBtn.addEventListener("click", addTitle);
// Function to add a title
function addTitle() {
  event.preventDefault();
  const title = titleInput.value;
  titlePlaceholder.textContent = title;
}
