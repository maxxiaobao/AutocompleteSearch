  (function() {
    console.log('js loading....');
    // Set searchField to the search input field.
    // Set timeout to the time you want to wait after the last character in milliseconds.
    // Set minLength to the minimum number of characters that constitutes a valid search.
    var searchField = document.querySelector('input#search-field'),
        timeout = 2000,
        minLength = 3;

    var textEntered = false;

    var timer, searchText;
    
    var handleInput = function() {
      searchText = searchField ? searchField.value : '';
      if (searchText.length < minLength) {
        return;
      }
      window.dataLayer.push({
        event: 'customSearch',
        customSearchInput: searchText
      });
      textEntered = false;
    };
    
    var startTimer = function(e) {
      textEntered = true;
      window.clearTimeout(timer);
      if (e.keyCode === 13) {
        handleInput();
        return;
      }
      timer = setTimeout(handleInput, timeout);
    };
    
    if (searchField !== null) {
      searchField.addEventListener('keydown', startTimer, true);
      searchField.addEventListener('blur', function() {
        if (textEntered) {
          window.clearTimeout(timer);
          handleInput();
        }
      }, true);
    }
  })();