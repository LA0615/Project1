var apiUrl = 'https://type.fit/api/quotes';

fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });