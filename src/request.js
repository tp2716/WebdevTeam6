// Make the actual CORS request.
export default function makeCorsRequest(query) {
  return new Promise((resolve, reject) => {
    const url = 'https://api.edamam.com/api/recipes/v2?type=any&app_id=47a14aa1&app_key=5f6e4fae1531f227d8a74ee073ef6c6f&q=' + query + '&random=true';

    const xhr = createCORSRequest('GET', url);
    if (!xhr) {
      reject('CORS not supported');
      return;
    }

    // Response handlers.
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject('Request failed with status: ' + xhr.status);
      }
    };

    xhr.onerror = function() {
      reject('Network error');
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(query);
  });
}

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
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