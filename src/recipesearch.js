// Make the actual CORS request.
export function makeCorsRequest(query) {
  let recipe = document.getElementById('recipe').value;
  let pre = document.getElementById('pre');

  var url = 'https://api.edamam.com/api/recipes/v2?type=any&app_id=47a14aa1&app_key=5f6e4fae1531f227d8a74ee073ef6c6f&q='+query;

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert(`Sorry we couldn't make the request: CORS is not supported by your browser`);
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    pre.innerHTML = text;
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  pre.innerHTML = 'Loading...';
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(recipe);
}

// Create the XHR object.
export function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
