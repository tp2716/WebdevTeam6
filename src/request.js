export default function makeCorsRequest(query) {
  let proxy = 'https://thingproxy.freeboard.io/fetch/';
  //return fetch(proxy+'https://api.edamam.com/api/recipes/v2/ad8ecf532b114c7a12eae0543b99dcb4?type=public&app_id=47a14aa1&app_key=5f6e4fae1531f227d8a74ee073ef6c6f', {
  return fetch(proxy+encodeURIComponent('https://api.edamam.com/api/recipes/v2?type=any&app_id=47a14aa1&app_key=5f6e4fae1531f227d8a74ee073ef6c6f&q=' + query + '&random=true'), {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
