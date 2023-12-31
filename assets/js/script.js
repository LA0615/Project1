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

//Key for the API call
const API_KEY = "bYHHxHBU513WV5IZp3wKNSVkKBwhu8qx";

//loads content when the stickerSearch function starts
document.addEventListener("DOMContentLoaded", stickerSearch);

// function that runs a for loop for the gif data
function handleStickerData(content) {
  for (var i = 0; i < content.data.length; i++) {
    console.log(content.data);
    console.log("META", content.meta);
    let containResults = document.getElementById("containResults");
    let img = document.createElement("img");
    img.src = content.data[i].images.downsized.url;
    img.alt = content.data[i].title;
    img.setAttribute("class", "draggable");
    let out = document.querySelector(".results");
    out.insertAdjacentElement("afterbegin", img);
    containResults.appendChild(out);
  }

  $(function () {
    const visionBoard = $("#board-box");
    $(".draggable").draggable({
      revert: "invalid",
      cursor: "move",
    });

    visionBoard.droppable({
      accept: ".draggable",
      classes: {
        "ui-droppable-active": "ui-state-highlight",
      },
      drop: function (event, ui) {
        addItem(ui.draggable);
      },
    });

    function addItem($item, ui) {
      $item.fadeOut(() => {
        var $list = $("ul", visionBoard).length
          ? $("ul", visionBoard)
          : $("<ul class=' ui-helper-reset'/>").appendTo(visionBoard);

        $item.appendTo($list).fadeIn(function () {
          $item.css({ position: "static" }).css({ height: "100px" });
        });
      });
    }
  });
}

//sticker search function
function stickerSearch() {
  var searchBtn = document.querySelector(".search-button");
  //below is the button event linked to the API call
  searchBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    //API call
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&limit=6&q=`;
    //Links API call to the search input class
    let searchInput = document.querySelector(".search-input");
    //variable for user entered search
    let str = searchInput.value.trim();
    url = url.concat(str);
    console.log(url);
    //variable for getting items out of local storage
    var savedItems = JSON.parse(localStorage.getItem("saved-items")) || [];
    //pushes the search-input value from local staorage
    savedItems.push(str);
    //saves user entry into local storage
    localStorage.setItem("saved-items", JSON.stringify(savedItems));
    console.log(savedItems);
    console.log(str);
    //creates buttons from previous user search entries
    const userInput = document.createElement("button");
    //links created button with search input entry
    userInput.textContent = str;
    userInput.classList.add("userInput");
    userInput.setAttribute(
      "class",
      "previous-button button is-info is-light is-small is-rounded"
    );
    //adds the buttons to a list element titles previousSearch
    previousSearch.appendChild(userInput);
    //function for each button running through an api fetch call to pull stickers again
    userInput.addEventListener("click", () => {
      runAPI(userInput.textContent);
    });
    //fetch call
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        handleStickerData(content);
      })
      //brings up an error card if fetch call is not working
      .catch((err) => {
        console.error(err);
      });
  });
  //variable for linking html list with created previously searched buttons
  const previousSearch = document.querySelector(".previousSearch");
  //variable for getting items out of the local storage
  var savedItems = JSON.parse(localStorage.getItem("saved-items")) || [];
  //linking the local storage saved items with a forEach funtion. Function is for getting user previous earch out of local storage
  savedItems.forEach((item) => {
    //If statement keeps the created array from generating a button per each item pulled from the API search
    if (!document.querySelector(`.userInput[data-value="${item}"]`)) {
      //below are vaiables for created elements that will go under the previousSearch list in html doc.
      const userInput = document.createElement("button");
      userInput.setAttribute(
        "class",
        "previous-button button is-info is-light is-small is-rounded"
      );
      userInput.textContent = item;
      userInput.classList.add("userInput");
      previousSearch.appendChild(userInput);
      //function linked to the user's previous search for pulling more stickers
      userInput.addEventListener("click", () => {
        runAPI(userInput.textContent);
      });
    }
  });

  //second function for pulling the stickers when clicking on a previpus search button.
  function runAPI(searchQuery) {
    //fetch call is the same as above except we are plugging in the search query generated from a previosly searched button
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&limit=6&q=${searchQuery}`;
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        handleStickerData(content);
        console.log(content);
      })

      .catch((err) => {
        console.error(err);
      });
  }
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
